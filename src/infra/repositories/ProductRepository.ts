import type { Product } from "../../domain/entities/index.js";
import type { ProductRepository } from "../../domain/repositories/index.js";
import { JsonFileRepository } from "./jsonFileRepository.js";

export class FileProductRepository implements ProductRepository {
  private store: JsonFileRepository<Product>;
  constructor() {
    this.store = new JsonFileRepository<Product>("database/product.json");
  }

  async list(): Promise<Product[]> {
    const map = await this.store.readAll();
    return Object.values(map);
  }

  async getById(id: string): Promise<Product | undefined> {
    const map = await this.store.readAll();
    return map[id];
  }

  async listByCategory(categoryId: string): Promise<Product[]> {
    const map = await this.store.readAll();
    return Object.values(map).filter((p) => p.categoryId === categoryId);
  }

  async listBySeller(sellerId: string): Promise<Product[]> {
    const map = await this.store.readAll();
    return Object.values(map).filter((p) => p.sellerId === sellerId);
  }

  async create(data: Omit<Product, "id"> & { id: string }): Promise<Product> {
    const map = await this.store.readAll();
    if (map[data.id]) throw new Error("Product id already exists");
    map[data.id] = { ...data } as Product;
    await this.store.writeAll(map);
    return map[data.id] as Product;
  }

  async update(
    id: string,
    data: Partial<Omit<Product, "id">>
  ): Promise<Product> {
    const map = await this.store.readAll();
    const existing = map[id];
    if (!existing) throw new Error("Product not found");
    if (data.hasOwnProperty("id")) throw new Error("Cannot update id");
    const next: Product = { ...existing, ...data };
    map[id] = next;
    await this.store.writeAll(map);
    return next;
  }

  async delete(id: string): Promise<void> {
    const map = await this.store.readAll();
    if (!map[id]) throw new Error("Product not found");
    delete map[id];
    await this.store.writeAll(map);
  }
}

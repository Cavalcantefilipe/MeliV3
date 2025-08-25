import type { Seller } from "../../domain/entities/index.js";
import type { SellerRepository } from "../../domain/repositories/index.js";
import { JsonFileRepository } from "./jsonFileRepository.js";

export class FileSellerRepository implements SellerRepository {
  private store: JsonFileRepository<Seller>;
  constructor() {
    this.store = new JsonFileRepository<Seller>("database/seeler.json");
  }

  async list(): Promise<Seller[]> {
    const map = await this.store.readAll();
    return Object.values(map);
  }

  async getById(id: string): Promise<Seller | undefined> {
    const map = await this.store.readAll();
    return map[id];
  }

  async getByEmail(email: string): Promise<Seller | undefined> {
    const map = await this.store.readAll();
    return Object.values(map).find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );
  }

  async create(data: Omit<Seller, "id"> & { id: string }): Promise<Seller> {
    const map = await this.store.readAll();
    if (map[data.id]) throw new Error("Seller id already exists");
    const existing = Object.values(map).find(
      (s) => s.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existing) throw new Error("Seller email must be unique");
    map[data.id] = { ...data } as Seller;
    await this.store.writeAll(map);
    return map[data.id] as Seller;
  }

  async update(id: string, data: Partial<Omit<Seller, "id">>): Promise<Seller> {
    const map = await this.store.readAll();
    const existing = map[id];
    if (!existing) throw new Error("Seller not found");
    if (data.hasOwnProperty("id")) throw new Error("Cannot update id");
    const next: Seller = { ...existing, ...data };
    if (
      data.email &&
      data.email.toLowerCase() !== existing.email.toLowerCase()
    ) {
      const conflict = Object.values(map).find(
        (s) => s.email.toLowerCase() === data.email!.toLowerCase()
      );
      if (conflict) throw new Error("Seller email must be unique");
    }
    map[id] = next;
    await this.store.writeAll(map);
    return next;
  }

  async delete(id: string): Promise<void> {
    const map = await this.store.readAll();
    if (!map[id]) throw new Error("Seller not found");
    delete map[id];
    await this.store.writeAll(map);
  }
}

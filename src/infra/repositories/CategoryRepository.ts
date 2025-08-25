import type { Category } from "../../domain/entities/index.js";
import type { CategoryRepository } from "../../domain/repositories/index.js";
import { JsonFileRepository } from "./jsonFileRepository.js";

export class FileCategoryRepository implements CategoryRepository {
  private store: JsonFileRepository<Category>;
  constructor() {
    this.store = new JsonFileRepository<Category>("database/category.json");
  }

  async list(): Promise<Category[]> {
    const map = await this.store.readAll();
    return Object.values(map);
  }

  async getById(id: string): Promise<Category | undefined> {
    const map = await this.store.readAll();
    return map[id];
  }

  async getByName(name: string): Promise<Category | undefined> {
    const map = await this.store.readAll();
    return Object.values(map).find((c) => c.name.toLowerCase() === name.toLowerCase());
  }

  async create(data: Omit<Category, "id"> & { id: string }): Promise<Category> {
    const map = await this.store.readAll();
    if (map[data.id]) throw new Error("Category id already exists");
    const existing = Object.values(map).find((c) => c.name.toLowerCase() === data.name.toLowerCase());
    if (existing) throw new Error("Category name must be unique");
    map[data.id] = { id: data.id, name: data.name };
    await this.store.writeAll(map);
    return map[data.id] as Category;
  }

  async update(id: string, data: Partial<Omit<Category, "id">>): Promise<Category> {
    const map = await this.store.readAll();
    const existing = map[id];
    if (!existing) throw new Error("Category not found");
    if (data.hasOwnProperty("id")) throw new Error("Cannot update id");
    const next: Category = { ...existing, ...data };
    if (data.name && data.name.toLowerCase() !== existing.name.toLowerCase()) {
      const conflict = Object.values(map).find((c) => c.name!.toLowerCase() === data.name!.toLowerCase());
      if (conflict) throw new Error("Category name must be unique");
    }
    map[id] = next;
    await this.store.writeAll(map);
    return next;
  }

  async delete(id: string): Promise<void> {
    const map = await this.store.readAll();
    if (!map[id]) throw new Error("Category not found");
    delete map[id];
    await this.store.writeAll(map);
  }
}



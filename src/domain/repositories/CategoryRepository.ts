import type { Category } from "../entities/index.js";

export interface CategoryRepository {
  list(): Promise<Category[]>;
  getById(id: string): Promise<Category | undefined>;
  getByName(name: string): Promise<Category | undefined>;
  create(data: Omit<Category, "id"> & { id: string }): Promise<Category>;
  update(id: string, data: Partial<Omit<Category, "id">>): Promise<Category>;
  delete(id: string): Promise<void>;
}

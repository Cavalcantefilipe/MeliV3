import type { Product } from "../entities/index.js";

export interface ProductRepository {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
  listByCategory(categoryId: string): Promise<Product[]>;
  listBySeller(sellerId: string): Promise<Product[]>;
  create(data: Omit<Product, "id"> & { id: string }): Promise<Product>;
  update(id: string, data: Partial<Omit<Product, "id">>): Promise<Product>;
  delete(id: string): Promise<void>;
}

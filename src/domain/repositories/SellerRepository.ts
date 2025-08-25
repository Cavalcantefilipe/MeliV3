import type { Seller } from "../entities/index.js";

export interface SellerRepository {
  list(): Promise<Seller[]>;
  getById(id: string): Promise<Seller | undefined>;
  getByEmail(email: string): Promise<Seller | undefined>;
  create(data: Omit<Seller, "id"> & { id: string }): Promise<Seller>;
  update(id: string, data: Partial<Omit<Seller, "id">>): Promise<Seller>;
  delete(id: string): Promise<void>;
}



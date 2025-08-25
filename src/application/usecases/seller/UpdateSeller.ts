import type { Seller } from "../../../domain/entities/index.js";
import type { SellerRepository } from "../../../domain/repositories/index.js";

export class UpdateSeller {
  constructor(private readonly repo: SellerRepository) {}
  async execute(id: string, data: Partial<Omit<Seller, "id">>): Promise<Seller> {
    return this.repo.update(id, data);
  }
}



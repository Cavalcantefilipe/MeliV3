import { v4 as uuidv4 } from "uuid";
import type { Seller } from "../../../domain/entities/index.js";
import type { SellerRepository } from "../../../domain/repositories/index.js";

export class CreateSeller {
  constructor(private readonly repo: SellerRepository) {}
  async execute(input: Omit<Seller, "id">): Promise<Seller> {
    const seller: Seller = { id: uuidv4(), ...input };
    return this.repo.create(seller);
  }
}



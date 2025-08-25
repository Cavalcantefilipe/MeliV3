import { v4 as uuidv4 } from "uuid";
import type { Seller } from "../../../domain/entities/Seller.js";
import type { SellerRepository } from "../../../domain/repositories/index.js";
import { sellerCreateSchema } from "../../../presentation/dtos/SellerDTO.js";

export class CreateSeller {
  constructor(private readonly repo: SellerRepository) {}
  async execute(input: Omit<Seller, "id">): Promise<Seller> {
    const parsed = sellerCreateSchema.safeParse(input);
    if (!parsed.success) throw new Error(parsed.error.message);
    const seller: Seller = { id: uuidv4(), ...parsed.data };
    return this.repo.create(seller);
  }
}

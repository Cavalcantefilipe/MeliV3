import type { Seller } from "../../../domain/entities/Seller.js";
import type { SellerRepository } from "../../../domain/repositories/index.js";
import { sellerUpdateSchema } from "../../../presentation/dtos/SellerDTO.js";
import { sanitizeObject } from "../../../shared/sanitize.js";

export class UpdateSeller {
  constructor(private readonly repo: SellerRepository) {}
  async execute(id: string, data: any): Promise<Seller> {
    const parsed = sellerUpdateSchema.safeParse(data);
    if (!parsed.success) throw new Error(parsed.error.message);
    const sanitized = sanitizeObject(parsed.data) as Partial<
      Omit<Seller, "id">
    >;
    return this.repo.update(id, sanitized);
  }
}

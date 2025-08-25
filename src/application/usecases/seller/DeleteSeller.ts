import type { SellerRepository } from "../../../domain/repositories/index.js";

export class DeleteSeller {
  constructor(private readonly repo: SellerRepository) {}
  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}



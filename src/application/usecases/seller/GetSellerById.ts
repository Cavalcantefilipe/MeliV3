import type { SellerRepository } from "../../../domain/repositories/index.js";

export class GetSellerById {
  constructor(private readonly repo: SellerRepository) {}
  async execute(id: string) { return this.repo.getById(id); }
}



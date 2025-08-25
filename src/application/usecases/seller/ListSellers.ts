import type { SellerRepository } from "../../../domain/repositories/index.js";

export class ListSellers {
  constructor(private readonly repo: SellerRepository) {}
  async execute() {
    return this.repo.list();
  }
}

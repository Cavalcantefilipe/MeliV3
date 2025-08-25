import type { ProductRepository } from "../../../domain/repositories/index.js";

export class GetProductsBySeller {
  constructor(private readonly products: ProductRepository) {}
  async execute(sellerId: string) {
    return this.products.listBySeller(sellerId);
  }
}

import type { ProductRepository } from "../../../domain/repositories/index.js";

export class GetProductsByCategory {
  constructor(private readonly products: ProductRepository) {}
  async execute(categoryId: string) {
    return this.products.listByCategory(categoryId);
  }
}



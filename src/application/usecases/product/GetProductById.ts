import type { ProductRepository } from "../../../domain/repositories/index.js";

export class GetProductById {
  constructor(private readonly products: ProductRepository) {}
  async execute(id: string) {
    return this.products.getById(id);
  }
}

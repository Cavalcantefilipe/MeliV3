import type { ProductRepository } from "../../../domain/repositories/index.js";

export class ListProducts {
  constructor(private readonly products: ProductRepository) {}
  async execute() {
    return this.products.list();
  }
}

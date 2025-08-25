import type { ProductRepository } from "../../../domain/repositories/index.js";

export class DeleteProduct {
  constructor(private readonly products: ProductRepository) {}
  async execute(id: string): Promise<void> {
    return this.products.delete(id);
  }
}

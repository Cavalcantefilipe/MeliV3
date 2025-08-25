import type { CategoryRepository, ProductRepository } from "../../../domain/repositories/index.js";

export class DeleteCategory {
  constructor(
    private readonly repo: CategoryRepository,
    private readonly products: ProductRepository
  ) {}
  async execute(id: string): Promise<void> {
    const inUse = await this.products.listByCategory(id);
    if (inUse.length > 0) throw new Error("Category in use by products");
    return this.repo.delete(id);
  }
}



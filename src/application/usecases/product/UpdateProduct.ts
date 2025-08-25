import type { Product } from "../../../domain/entities/index.js";
import type { ProductRepository, CategoryRepository, SellerRepository } from "../../../domain/repositories/index.js";

export class UpdateProduct {
  constructor(
    private readonly products: ProductRepository,
    private readonly categories: CategoryRepository,
    private readonly sellers: SellerRepository
  ) {}

  async execute(id: string, data: Partial<Omit<Product, "id">>): Promise<Product> {
    if (data.categoryId) {
      const cat = await this.categories.getById(data.categoryId);
      if (!cat) throw new Error("categoryId does not exist");
    }
    if (data.sellerId) {
      const sel = await this.sellers.getById(data.sellerId);
      if (!sel) throw new Error("sellerId does not exist");
    }
    return this.products.update(id, data);
  }
}



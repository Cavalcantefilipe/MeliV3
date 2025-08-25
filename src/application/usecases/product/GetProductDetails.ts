import type { ProductRepository } from "../../../domain/repositories/index.js";
import type { CategoryRepository } from "../../../domain/repositories/index.js";
import type { SellerRepository } from "../../../domain/repositories/index.js";
import type { Product } from "../../../domain/entities/Product.js";

export class GetProductDetails {
  constructor(
    private readonly products: ProductRepository,
    private readonly categories: CategoryRepository,
    private readonly sellers: SellerRepository
  ) {}

  async execute(productId: string) {
    const product = await this.products.getById(productId);
    if (!product) return undefined;
    const [seller, category, sellersProducts] = await Promise.all([
      this.sellers.getById(product.sellerId),
      this.categories.getById(product.categoryId),
      this.products.listBySeller(product.sellerId),
    ]);
    const recommendedProducts = (
      await this.products.listByCategory(product.categoryId)
    ).filter((p: Product) => p.id !== product.id);
    return {
      ...product,
      seller,
      category,
      sellersProducts: sellersProducts.filter((p: Product) => p.id !== product.id),
      recommendedProducts,
    } as const;
  }
}

import { v4 as uuidv4 } from "uuid";
import type { Product } from "../../../domain/entities/index.js";
import type { ProductRepository, CategoryRepository, SellerRepository } from "../../../domain/repositories/index.js";

export class CreateProduct {
  constructor(
    private readonly products: ProductRepository,
    private readonly categories: CategoryRepository,
    private readonly sellers: SellerRepository
  ) {}

  async execute(input: Omit<Product, "id">): Promise<Product> {
    const [cat, sel] = await Promise.all([
      this.categories.getById(input.categoryId),
      this.sellers.getById(input.sellerId),
    ]);
    if (!cat) throw new Error("categoryId does not exist");
    if (!sel) throw new Error("sellerId does not exist");
    const product: Product = { ...input, id: uuidv4() };
    return this.products.create(product);
  }
}



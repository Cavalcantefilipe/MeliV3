import type { Product } from "../../../domain/entities/Product.js";
import type {
  ProductRepository,
  CategoryRepository,
  SellerRepository,
} from "../../../domain/repositories/index.js";
import { productUpdateSchema } from "../../../presentation/dtos/ProductDTO.js";
import { sanitizeObject } from "../../../shared/sanitize.js";

export class UpdateProduct {
  constructor(
    private readonly products: ProductRepository,
    private readonly categories: CategoryRepository,
    private readonly sellers: SellerRepository
  ) {}

  async execute(id: string, data: any): Promise<Product> {
    const parsed = productUpdateSchema.safeParse(data);
    if (!parsed.success) throw new Error(parsed.error.message);
    const validated = parsed.data;
    // sanitize: drop undefined keys to avoid overwriting values with undefined
    const sanitized = sanitizeObject(validated) as Partial<Omit<Product, "id">>;

    if (sanitized.categoryId) {
      const cat = await this.categories.getById(sanitized.categoryId);
      if (!cat) throw new Error("categoryId does not exist");
    }
    if (sanitized.sellerId) {
      const sel = await this.sellers.getById(sanitized.sellerId);
      if (!sel) throw new Error("sellerId does not exist");
    }
    return this.products.update(id, sanitized);
  }
}

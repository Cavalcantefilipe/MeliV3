import { v4 as uuidv4 } from "uuid";
import type { Product } from "../../../domain/entities/Product.js";
import type {
  ProductRepository,
  CategoryRepository,
  SellerRepository,
} from "../../../domain/repositories/index.js";
import { productCreateSchema } from "../../../presentation/dtos/ProductDTO.js";

export class CreateProduct {
  constructor(
    private readonly products: ProductRepository,
    private readonly categories: CategoryRepository,
    private readonly sellers: SellerRepository
  ) {}

  async execute(input: Omit<Product, "id">): Promise<Product> {
    const parsed = productCreateSchema.safeParse(input);
    if (!parsed.success) throw new Error(parsed.error.message);
    const data = parsed.data;
    const [cat, sel] = await Promise.all([
      this.categories.getById(data.categoryId),
      this.sellers.getById(data.sellerId),
    ]);
    if (!cat) throw new Error("categoryId does not exist");
    if (!sel) throw new Error("sellerId does not exist");
    const product: Product = { ...data, id: uuidv4() };
    return this.products.create(product);
  }
}

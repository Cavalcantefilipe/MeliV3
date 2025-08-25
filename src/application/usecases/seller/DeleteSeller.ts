import type {
  SellerRepository,
  ProductRepository,
} from "../../../domain/repositories/index.js";

export class DeleteSeller {
  constructor(
    private readonly repo: SellerRepository,
    private readonly products: ProductRepository
  ) {}
  async execute(id: string): Promise<void> {
    const inUse = await this.products.listBySeller(id);
    if (inUse.length > 0) throw new Error("Seller in use by products");
    return this.repo.delete(id);
  }
}

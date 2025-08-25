import type { Request, Response } from "express";
import type { Product } from "../../../domain/entities/index.js";
import { GetProductDetails } from "../../../application/usecases/product/GetProductDetails.js";
import { CreateProduct } from "../../../application/usecases/product/CreateProduct.js";
import { UpdateProduct } from "../../../application/usecases/product/UpdateProduct.js";
import { DeleteProduct } from "../../../application/usecases/product/DeleteProduct.js";
import { ListProducts } from "../../../application/usecases/product/ListProducts.js";
import { GetProductById } from "../../../application/usecases/product/GetProductById.js";
import { GetProductsByCategory } from "../../../application/usecases/product/GetProductsByCategory.js";
import { GetProductsBySeller } from "../../../application/usecases/product/GetProductsBySeller.js";
import { productCreateSchema, productUpdateSchema } from "../../../presentation/validation/Product.js";
import { pickDefined } from "../../../shared/object.js";

export class ProductController {
  constructor(
    private readonly listProducts: ListProducts,
    private readonly getProductById: GetProductById,
    private readonly getProductDetails: GetProductDetails,
    private readonly getProductsByCategory: GetProductsByCategory,
    private readonly getProductsBySeller: GetProductsBySeller,
    private readonly createProduct: CreateProduct,
    private readonly updateProduct: UpdateProduct,
    private readonly deleteProduct: DeleteProduct
  ) {}

  async list(req: Request, res: Response) {
    const items = await this.listProducts.execute();
    res.json(items);
  }

  async get(req: Request, res: Response) {
    const item = await this.getProductById.execute(String(req.params.id));
    if (!item) return res.status(404).json({ error: "Product not found" });
    res.json(item);
  }

  async details(req: Request, res: Response) {
    const id = String(req.params.id);
    const result = await this.getProductDetails.execute(id);
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json(result);
  }

  async listByCategory(req: Request, res: Response) {
    const categoryId = String(req.params.categoryId);
    const items = await this.getProductsByCategory.execute(categoryId);
    res.json(items);
  }

  async listBySeller(req: Request, res: Response) {
    const sellerId = String(req.params.sellerId);
    const items = await this.getProductsBySeller.execute(sellerId);
    res.json(items);
  }

  async create(req: Request, res: Response) {
    const parsed = productCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const created = await this.createProduct.execute(parsed.data);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    if ("id" in req.body) return res.status(400).json({ error: "Cannot update id" });
    const parsed = productUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const d = parsed.data as Partial<Omit<Product, "id">>;
      const payload = pickDefined(d, [
        "realUrl",
        "sellerId",
        "name",
        "categoryId",
        "price",
        "quantity",
        "sales",
        "rating",
        "condition",
        "description",
        "images",
        "productFeatures",
      ] as const);
      const updated = await this.updateProduct.execute(String(req.params.id), payload);
      res.json(updated);
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteProduct.execute(String(req.params.id));
      res.status(204).send();
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  }
}



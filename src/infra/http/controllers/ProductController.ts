import type { Request, Response } from "express";
import type { Product } from "../../../domain/entities/Product.js";
import { GetProductDetails } from "../../../application/usecases/product/GetProductDetails.js";
import { CreateProduct } from "../../../application/usecases/product/CreateProduct.js";
import { UpdateProduct } from "../../../application/usecases/product/UpdateProduct.js";
import { DeleteProduct } from "../../../application/usecases/product/DeleteProduct.js";
import { ListProducts } from "../../../application/usecases/product/ListProducts.js";
import { GetProductById } from "../../../application/usecases/product/GetProductById.js";
import { GetProductsByCategory } from "../../../application/usecases/product/GetProductsByCategory.js";
import { GetProductsBySeller } from "../../../application/usecases/product/GetProductsBySeller.js";

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
    try {
      const created = await this.createProduct.execute(
        req.body as Omit<Product, "id">
      );
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    if ("id" in req.body)
      return res.status(400).json({ error: "Cannot update id" });
    try {
      const updated = await this.updateProduct.execute(
        String(req.params.id),
        req.body as Partial<Omit<Product, "id">>
      );
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

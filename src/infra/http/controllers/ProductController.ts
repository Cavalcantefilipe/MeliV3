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
import { FileProductRepository } from "../../repositories/ProductRepository.js";
import { FileCategoryRepository } from "../../repositories/CategoryRepository.js";
import { FileSellerRepository } from "../../repositories/SellerRepository.js";
import { productCreateSchema, productUpdateSchema } from "../../../presentation/validation/Product.js";

const products = new FileProductRepository();
const categories = new FileCategoryRepository();
const sellers = new FileSellerRepository();
const getProductDetails = new GetProductDetails(products, categories, sellers);
const createProduct = new CreateProduct(products, categories, sellers);
const updateProduct = new UpdateProduct(products, categories, sellers);
const deleteProduct = new DeleteProduct(products);
const listProducts = new ListProducts(products);
const getProductById = new GetProductById(products);
const getProductsByCategory = new GetProductsByCategory(products);
const getProductsBySeller = new GetProductsBySeller(products);

export const ProductController = {
  async list(req: Request, res: Response) {
    const items = await listProducts.execute();
    res.json(items);
  },

  async get(req: Request, res: Response) {
    const item = await getProductById.execute(String(req.params.id));
    if (!item) return res.status(404).json({ error: "Product not found" });
    res.json(item);
  },

  async details(req: Request, res: Response) {
    const id = String(req.params.id);
    const result = await getProductDetails.execute(id);
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.json(result);
  },

  async listByCategory(req: Request, res: Response) {
    const categoryId = String(req.params.categoryId);
    const items = await getProductsByCategory.execute(categoryId);
    res.json(items);
  },

  async listBySeller(req: Request, res: Response) {
    const sellerId = String(req.params.sellerId);
    const items = await getProductsBySeller.execute(sellerId);
    res.json(items);
  },

  async create(req: Request, res: Response) {
    const parsed = productCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const created = await createProduct.execute(parsed.data);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async update(req: Request, res: Response) {
    if ("id" in req.body) return res.status(400).json({ error: "Cannot update id" });
    const parsed = productUpdateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
    try {
      if (parsed.data.categoryId) {
        const cat = await categories.getById(parsed.data.categoryId);
        if (!cat) return res.status(400).json({ error: "categoryId does not exist" });
      }
      if (parsed.data.sellerId) {
        const sel = await sellers.getById(parsed.data.sellerId);
        if (!sel) return res.status(400).json({ error: "sellerId does not exist" });
      }
      const d = parsed.data;
      const payload: Partial<Omit<Product, "id">> = {};
      if (d.realUrl !== undefined) payload.realUrl = d.realUrl;
      if (d.sellerId !== undefined) payload.sellerId = d.sellerId;
      if (d.name !== undefined) payload.name = d.name;
      if (d.categoryId !== undefined) payload.categoryId = d.categoryId;
      if (d.price !== undefined) payload.price = d.price;
      if (d.quantity !== undefined) payload.quantity = d.quantity;
      if (d.sales !== undefined) payload.sales = d.sales;
      if (d.rating !== undefined) payload.rating = d.rating;
      if (d.condition !== undefined) payload.condition = d.condition;
      if (d.description !== undefined) payload.description = d.description;
      if (d.images !== undefined) payload.images = d.images;
      if (d.productFeatures !== undefined) payload.productFeatures = d.productFeatures as any;
      const updated = await updateProduct.execute(String(req.params.id), payload);
      res.json(updated);
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await deleteProduct.execute(String(req.params.id));
      res.status(204).send();
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  },
};



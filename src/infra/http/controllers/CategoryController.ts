import type { Request, Response } from "express";
import type { Category } from "../../../domain/entities/Index.ts";
import { FileCategoryRepository } from "../../repositories/CategoryRepository.js";
import { CreateCategory } from "../../../application/usecases/category/CreateCategory.js";
import { UpdateCategory } from "../../../application/usecases/category/UpdateCategory.js";
import { DeleteCategory } from "../../../application/usecases/category/DeleteCategory.js";
import { ListCategories } from "../../../application/usecases/category/ListCategories.js";
import { GetCategoryById } from "../../../application/usecases/category/GetCategoryById.js";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "../../../presentation/validation/Category.js";
import { FileProductRepository } from "../../repositories/ProductRepository.js";

const repo = new FileCategoryRepository();
const createCategory = new CreateCategory(repo);
const updateCategory = new UpdateCategory(repo);
const deleteCategory = new DeleteCategory(repo);
const listCategories = new ListCategories(repo);
const getCategoryById = new GetCategoryById(repo);

export const CategoryController = {
  async list(req: Request, res: Response) {
    const items = await listCategories.execute();
    res.json(items);
  },

  async get(req: Request, res: Response) {
    const item = await getCategoryById.execute(String(req.params.id));
    if (!item) return res.status(404).json({ error: "Category not found" });
    res.json(item);
  },

  async create(req: Request, res: Response) {
    const parsed = categoryCreateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const created = await createCategory.execute(parsed.data);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async update(req: Request, res: Response) {
    if ("id" in req.body)
      return res.status(400).json({ error: "Cannot update id" });
    const parsed = categoryUpdateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const data = parsed.data;
      const payload: Partial<Omit<Category, "id">> = {};
      if (data.name !== undefined) payload.name = data.name;
      const updated = await updateCategory.execute(
        String(req.params.id),
        payload
      );
      res.json(updated);
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const products = new FileProductRepository();
      const inUse = await products.listByCategory(String(req.params.id));
      if (inUse.length > 0)
        return res.status(409).json({ error: "Category in use by products" });
      await deleteCategory.execute(String(req.params.id));
      res.status(204).send();
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  },
};

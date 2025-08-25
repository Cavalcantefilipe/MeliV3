import type { Request, Response } from "express";
import type { Category } from "../../../domain/entities/index.ts";
import { CreateCategory } from "../../../application/usecases/category/CreateCategory.js";
import { UpdateCategory } from "../../../application/usecases/category/UpdateCategory.js";
import { DeleteCategory } from "../../../application/usecases/category/DeleteCategory.js";
import { ListCategories } from "../../../application/usecases/category/ListCategories.js";
import { GetCategoryById } from "../../../application/usecases/category/GetCategoryById.js";
import {
  categoryCreateSchema,
  categoryUpdateSchema,
} from "../../../presentation/validation/Category.js";
import { pickDefined } from "../../../shared/object.js";

export class CategoryController {
  constructor(
    private readonly listCategories: ListCategories,
    private readonly getCategoryById: GetCategoryById,
    private readonly createCategory: CreateCategory,
    private readonly updateCategory: UpdateCategory,
    private readonly deleteCategory: DeleteCategory
  ) {}

  async list(req: Request, res: Response) {
    const items = await this.listCategories.execute();
    res.json(items);
  }

  async get(req: Request, res: Response) {
    const item = await this.getCategoryById.execute(String(req.params.id));
    if (!item) return res.status(404).json({ error: "Category not found" });
    res.json(item);
  }

  async create(req: Request, res: Response) {
    const parsed = categoryCreateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const created = await this.createCategory.execute(parsed.data);
      res.status(201).json(created);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }

  async update(req: Request, res: Response) {
    if ("id" in req.body)
      return res.status(400).json({ error: "Cannot update id" });
    const parsed = categoryUpdateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: parsed.error.flatten() });
    try {
      const data = parsed.data as Partial<Omit<Category, "id">>;
      const payload = pickDefined(data, ["name"] as const);
      const updated = await this.updateCategory.execute(String(req.params.id), payload);
      res.json(updated);
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.deleteCategory.execute(String(req.params.id));
      res.status(204).send();
    } catch (e: any) {
      const status = e.message.includes("not found") ? 404 : 400;
      res.status(status).json({ error: e.message });
    }
  }
}

import type { Category } from "../../../domain/entities/Category.js";
import type { CategoryRepository } from "../../../domain/repositories/Index.js";
import { categoryUpdateSchema } from "../../../presentation/dtos/CategoryDTO.js";
import { sanitizeObject } from "../../../shared/sanitize.js";

export class UpdateCategory {
  constructor(private readonly repo: CategoryRepository) {}
  async execute(id: string, data: any): Promise<Category> {
    const parsed = categoryUpdateSchema.safeParse(data);
    if (!parsed.success) throw new Error(parsed.error.message);
    const sanitized = sanitizeObject(parsed.data) as Partial<
      Omit<Category, "id">
    >;
    return this.repo.update(id, sanitized);
  }
}

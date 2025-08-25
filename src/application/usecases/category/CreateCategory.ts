import { v4 as uuidv4 } from "uuid";
import type { Category } from "../../../domain/entities/Category.js";
import type { CategoryRepository } from "../../../domain/repositories/index.js";
import { categoryCreateSchema } from "../../../presentation/dtos/CategoryDTO.js";

export class CreateCategory {
  constructor(private readonly repo: CategoryRepository) {}
  async execute(input: Omit<Category, "id">): Promise<Category> {
    const parsed = categoryCreateSchema.safeParse(input);
    if (!parsed.success) throw new Error(parsed.error.message);
    const category: Category = { id: uuidv4(), ...parsed.data };
    return this.repo.create(category);
  }
}

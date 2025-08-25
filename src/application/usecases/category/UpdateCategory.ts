import type { Category } from "../../../domain/entities/index.js";
import type { CategoryRepository } from "../../../domain/repositories/index.js";

export class UpdateCategory {
  constructor(private readonly repo: CategoryRepository) {}
  async execute(id: string, data: Partial<Omit<Category, "id">>): Promise<Category> {
    return this.repo.update(id, data);
  }
}



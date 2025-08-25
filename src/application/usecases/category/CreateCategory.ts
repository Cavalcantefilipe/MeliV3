import { v4 as uuidv4 } from "uuid";
import type { Category } from "../../../domain/entities/index.js";
import type { CategoryRepository } from "../../../domain/repositories/index.js";

export class CreateCategory {
  constructor(private readonly repo: CategoryRepository) {}
  async execute(input: Omit<Category, "id">): Promise<Category> {
    const category: Category = { id: uuidv4(), ...input };
    return this.repo.create(category);
  }
}



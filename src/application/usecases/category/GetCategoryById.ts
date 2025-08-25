import type { CategoryRepository } from "../../../domain/repositories/index.js";

export class GetCategoryById {
  constructor(private readonly repo: CategoryRepository) {}
  async execute(id: string) { return this.repo.getById(id); }
}



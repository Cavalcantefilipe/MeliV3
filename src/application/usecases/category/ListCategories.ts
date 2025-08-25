import type { CategoryRepository } from "../../../domain/repositories/index.js";

export class ListCategories {
  constructor(private readonly repo: CategoryRepository) {}
  async execute() { return this.repo.list(); }
}



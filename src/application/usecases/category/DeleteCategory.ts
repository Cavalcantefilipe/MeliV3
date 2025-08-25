import type { CategoryRepository } from "../../../domain/repositories/index.js";

export class DeleteCategory {
  constructor(private readonly repo: CategoryRepository) {}
  async execute(id: string): Promise<void> {
    return this.repo.delete(id);
  }
}



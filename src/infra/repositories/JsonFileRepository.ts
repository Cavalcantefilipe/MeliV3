import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export class JsonFileRepository<T extends { id: string }> {
  private filePath: string;
  constructor(relativePathFromRoot: string) {
    const root = path.resolve(process.cwd());
    this.filePath = path.resolve(root, relativePathFromRoot);
  }

  async readAll(): Promise<Record<string, T>> {
    const content = await readFile(this.filePath, "utf-8");
    return JSON.parse(content) as Record<string, T>;
  }

  async writeAll(items: Record<string, T>): Promise<void> {
    const content = JSON.stringify(items, null, 2);
    await writeFile(this.filePath, content, "utf-8");
  }
}



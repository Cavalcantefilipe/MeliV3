import { DeleteCategory } from "../DeleteCategory.js";

test("DeleteCategory removes category", async () => {
  let deleted: string | null = null;
  const repo: any = { delete: async (id: string) => (deleted = id) };
  const products: any = { listByCategory: async () => [] };
  const useCase = new DeleteCategory(repo, products);
  await useCase.execute("c1");
  expect(deleted).toBe("c1");
});



import { GetProductsByCategory } from "../GetProductsByCategory.js";

test("GetProductsByCategory returns matches", async () => {
  const repo = { listByCategory: async (cid: string) => [{ id: "p1", categoryId: cid }] } as any;
  const useCase = new GetProductsByCategory(repo);
  const items = await useCase.execute("c1");
  expect(items[0].categoryId).toBe("c1");
});



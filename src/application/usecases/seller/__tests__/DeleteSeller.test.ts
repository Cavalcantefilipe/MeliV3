import { DeleteSeller } from "../DeleteSeller.js";

test("DeleteSeller calls repository", async () => {
  let deleted: string | null = null;
  const repo: any = { delete: async (id: string) => (deleted = id) };
  const products: any = { listBySeller: async () => [] };
  const useCase = new DeleteSeller(repo, products);
  await useCase.execute("s1");
  expect(deleted).toBe("s1");
});



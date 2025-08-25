import { DeleteSeller } from "../DeleteSeller.js";

test("DeleteSeller calls repository", async () => {
  let deleted: string | null = null;
  const repo: any = { delete: async (id: string) => (deleted = id) };
  const useCase = new DeleteSeller(repo);
  await useCase.execute("s1");
  expect(deleted).toBe("s1");
});



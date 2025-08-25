import { DeleteProduct } from "../DeleteProduct.js";

test("DeleteProduct calls repository", async () => {
  let called = false;
  const repo = { delete: async (_: string) => { called = true; } } as any;
  const useCase = new DeleteProduct(repo);
  await useCase.execute("p1");
  expect(called).toBe(true);
});



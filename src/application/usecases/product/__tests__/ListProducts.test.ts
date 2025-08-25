import { ListProducts } from "../ListProducts.js";

test("ListProducts returns items", async () => {
  const repo = { list: async () => [{ id: "p1" }] } as any;
  const useCase = new ListProducts(repo);
  const items = await useCase.execute();
  expect(items.length).toBe(1);
});



import { UpdateProduct } from "../UpdateProduct.js";

test("UpdateProduct validates seller and category when provided", async () => {
  const products = { update: async (_: string, __: any) => ({ id: "p1" }) } as any;
  const categories = { getById: async () => ({ id: "c1", name: "Cat" }) } as any;
  const sellers = { getById: async () => ({ id: "s1", name: "S", email: "a@b.com", phone: "x", sales: 1 }) } as any;
  const useCase = new UpdateProduct(products, categories, sellers);
  const updated = await useCase.execute("p1", { categoryId: "c1", sellerId: "s1" } as any);
  expect(updated.id).toBe("p1");
});

test("UpdateProduct throws for invalid categoryId", async () => {
  const products = { update: async (_: string, __: any) => ({ id: "p1" }) } as any;
  const categories = { getById: async () => undefined } as any;
  const sellers = { getById: async () => ({ id: "s1", name: "S", email: "a@b.com", phone: "x", sales: 1 }) } as any;
  const useCase = new UpdateProduct(products, categories, sellers);
  await expect(useCase.execute("p1", { categoryId: "bad" } as any)).rejects.toThrow(/categoryId/);
});



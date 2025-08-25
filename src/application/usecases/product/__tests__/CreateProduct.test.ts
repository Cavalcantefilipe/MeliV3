import { CreateProduct } from "../CreateProduct.js";

test("CreateProduct succeeds and generates UUID", async () => {
  const input: any = {
    realUrl: "https://example.com",
    sellerId: "s1",
    name: "P1",
    categoryId: "c1",
    price: 10,
    quantity: 2,
    sales: 0,
    rating: 4,
    condition: "New",
    description: "desc",
    images: [],
    productFeatures: {},
  };
  const products = { create: async (p: any) => p } as any;
  const categories = {
    getById: async (id: string) =>
      id === "c1" ? { id, name: "Cat" } : undefined,
  } as any;
  const sellers = {
    getById: async (id: string) =>
      id === "s1"
        ? { id, name: "Sel", email: "a@b.com", phone: "x", sales: 1 }
        : undefined,
  } as any;
  const useCase = new CreateProduct(products, categories, sellers);
  const created = await useCase.execute(input);
  expect(created.id).toBeDefined();
  expect(created.name).toBe("P1");
});

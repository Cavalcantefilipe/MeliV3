import { GetProductsBySeller } from "../GetProductsBySeller.js";

test("GetProductsBySeller returns matches", async () => {
  const repo = { listBySeller: async (sid: string) => [{ id: "p1", sellerId: sid }] } as any;
  const useCase = new GetProductsBySeller(repo);
  const items = await useCase.execute("s1");
  expect(items[0].sellerId).toBe("s1");
});



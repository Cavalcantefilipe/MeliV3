import { GetSellerById } from "../GetSellerById.js";

test("GetSellerById returns seller or undefined", async () => {
  const repo: any = { getById: async (id: string) => (id === "s1" ? { id, name: "S" } : undefined) };
  const useCase = new GetSellerById(repo);
  expect(await useCase.execute("s1")).toEqual({ id: "s1", name: "S" } as any);
  expect(await useCase.execute("missing")).toBeUndefined();
});



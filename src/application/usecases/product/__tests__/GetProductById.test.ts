import { GetProductById } from "../GetProductById.js";

test("GetProductById returns product or undefined", async () => {
  const repo = { getById: async (id: string) => (id === "p1" ? { id } : undefined) } as any;
  const useCase = new GetProductById(repo);
  expect(await useCase.execute("p1")).toEqual({ id: "p1" } as any);
  expect(await useCase.execute("missing")).toBeUndefined();
});



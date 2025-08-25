import { GetCategoryById } from "../GetCategoryById.js";

test("GetCategoryById returns category or undefined", async () => {
  const repo: any = { getById: async (id: string) => (id === "c1" ? { id, name: "Cat" } : undefined) };
  const useCase = new GetCategoryById(repo);
  expect(await useCase.execute("c1")).toEqual({ id: "c1", name: "Cat" } as any);
  expect(await useCase.execute("missing")).toBeUndefined();
});



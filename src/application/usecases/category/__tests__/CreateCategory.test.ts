import { CreateCategory } from "../CreateCategory.js";

test("CreateCategory generates id and saves", async () => {
  const storage: any = {};
  const repo: any = { create: async (c: any) => (storage[c.id] = c) };
  const useCase = new CreateCategory(repo);
  const created = await useCase.execute({ name: "Cat" } as any);
  expect(created.id).toBeDefined();
  expect(storage[created.id].name).toBe("Cat");
});

import { ListCategories } from "../ListCategories.js";

test("ListCategories returns all categories", async () => {
  const repo: any = { list: async () => [{ id: "c1", name: "Cat" }] };
  const useCase = new ListCategories(repo);
  const items = await useCase.execute();
  expect(items.length).toBe(1);
});



import { ListSellers } from "../ListSellers.js";

test("ListSellers returns all sellers", async () => {
  const repo: any = { list: async () => [{ id: "s1", name: "S" }] };
  const useCase = new ListSellers(repo);
  const items = await useCase.execute();
  expect(items.length).toBe(1);
});



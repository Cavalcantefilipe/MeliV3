import { CreateSeller } from "../CreateSeller.js";

test("CreateSeller generates id and saves", async () => {
  const storage: any = {};
  const repo: any = { create: async (s: any) => (storage[s.id] = s) };
  const useCase = new CreateSeller(repo);
  const created = await useCase.execute({ name: "S", email: "a@b.com", phone: "x", sales: 0 } as any);
  expect(created.id).toBeDefined();
  expect(storage[created.id].name).toBe("S");
});



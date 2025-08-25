import { UpdateSeller } from "../UpdateSeller.js";

test("UpdateSeller updates fields", async () => {
  const storage: any = { s1: { id: "s1", name: "S", email: "a@b.com", phone: "x", sales: 0 } };
  const repo: any = { update: async (id: string, d: any) => (storage[id] = { ...storage[id], ...d }) };
  const useCase = new UpdateSeller(repo);
  const updated = await useCase.execute("s1", { name: "S2" } as any);
  expect(updated.name).toBe("S2");
});



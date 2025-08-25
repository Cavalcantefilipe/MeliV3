import { UpdateCategory } from "../UpdateCategory.js";

test("UpdateCategory updates name", async () => {
  const storage: any = { c1: { id: "c1", name: "Old" } };
  const repo: any = {
    update: async (id: string, d: any) =>
      (storage[id] = { ...storage[id], ...d }),
  };
  const useCase = new UpdateCategory(repo);
  const updated = await useCase.execute("c1", { name: "New" } as any);
  expect(updated.name).toBe("New");
});

test("UpdateCategory fails when not found", async () => {
  const repo: any = {
    update: async (id: string, d: any) => {
      throw new Error("Not found");
    },
  };
  const useCase = new UpdateCategory(repo);
  await expect(
    useCase.execute("missing", { name: "New" } as any)
  ).rejects.toThrow(/Not found/);
});

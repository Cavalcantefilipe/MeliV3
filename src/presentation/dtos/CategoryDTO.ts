import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(1).optional(),
});

export type CategoryCreateDTO = z.infer<typeof categoryCreateSchema>;
export type CategoryUpdateDTO = z.infer<typeof categoryUpdateSchema>;



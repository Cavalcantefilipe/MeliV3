import { z } from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(1, "name is required"),
});

export const categoryUpdateSchema = z.object({
  name: z.string().min(1).optional(),
});



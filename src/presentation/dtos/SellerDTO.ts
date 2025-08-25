import { z } from "zod";

export const sellerCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  sales: z.number().int().nonnegative(),
});

export const sellerUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  sales: z.number().int().nonnegative().optional(),
});

export type SellerCreateDTO = z.infer<typeof sellerCreateSchema>;
export type SellerUpdateDTO = z.infer<typeof sellerUpdateSchema>;



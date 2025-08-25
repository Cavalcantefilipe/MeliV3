import { z } from "zod";

export const productCreateSchema = z.object({
  realUrl: z.string().url(),
  sellerId: z.string().min(1),
  name: z.string().min(1),
  categoryId: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  sales: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5),
  condition: z.string().min(1),
  description: z.string().min(1),
  images: z.array(z.string().url()).default([]),
  productFeatures: z.record(z.string(), z.any()).default({}),
});

export const productUpdateSchema = z.object({
  realUrl: z.string().url().optional(),
  sellerId: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  categoryId: z.string().min(1).optional(),
  price: z.number().positive().optional(),
  quantity: z.number().int().nonnegative().optional(),
  sales: z.number().int().nonnegative().optional(),
  rating: z.number().min(0).max(5).optional(),
  condition: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  images: z.array(z.string().url()).optional(),
  productFeatures: z.record(z.string(), z.any()).optional(),
});

export type ProductCreateDTO = z.infer<typeof productCreateSchema>;
export type ProductUpdateDTO = z.infer<typeof productUpdateSchema>;



import { z } from "zod";

export const clientePaginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 1))
    .refine((v) => v > 0, "Page deve ser maior que zero"),

  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 10))
    .refine((v) => v > 0 && v <= 100, "Limit deve ser entre 1 e 100"),
});

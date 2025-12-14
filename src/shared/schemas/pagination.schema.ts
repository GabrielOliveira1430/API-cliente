import { z } from "zod";

export const paginationQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => Number(val ?? 1))
    .refine((val) => val >= 1, {
      message: "Page deve ser maior ou igual a 1",
    }),

  limit: z
    .string()
    .optional()
    .transform((val) => Number(val ?? 10))
    .refine((val) => val >= 1 && val <= 100, {
      message: "Limit deve estar entre 1 e 100",
    }),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

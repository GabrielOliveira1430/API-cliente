import { z } from "zod";

export const clienteIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((id) => id > 0, "ID deve ser maior que zero"),
});

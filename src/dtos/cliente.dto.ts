import { z } from "zod";

export const createClienteSchema = z.object({
  nome: z.string().min(1),
  email: z.string().email(),
  telefone: z.string().optional()
});

export type CreateClienteDTO = z.infer<typeof createClienteSchema>;

import { z } from "zod";

export const createClienteSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(8, "Telefone inválido").optional(),
});

export const updateClienteSchema = z
  .object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
    email: z.string().email("E-mail inválido").optional(),
    telefone: z.string().min(8, "Telefone inválido").optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    { message: "Envie ao menos um campo para atualizar" }
  );

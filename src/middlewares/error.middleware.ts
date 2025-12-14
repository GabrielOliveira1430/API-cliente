import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 🔹 ZOD ERROR
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.reduce((acc: Record<string, string>, curr) => {
      const field = curr.path.join(".");
      acc[field] = curr.message;
      return acc;
    }, {});

    return res.status(400).json({
      message: "Erro de validação",
      errors: formattedErrors,
    });
  }

  // 🔹 PRISMA ERROR
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // exemplo: email duplicado
    if (err.code === "P2002") {
      return res.status(409).json({
        message: "Registro duplicado",
        field: err.meta?.target,
      });
    }

    return res.status(400).json({
      message: "Erro no banco de dados",
      code: err.code,
    });
  }

  // 🔹 ERRO GENÉRICO
  if (err instanceof Error) {
    return res.status(400).json({
      message: err.message,
    });
  }

  // 🔹 Fallback
  return res.status(500).json({
    message: "Erro interno do servidor",
  });
}

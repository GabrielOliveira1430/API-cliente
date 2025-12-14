import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

interface TokenPayload extends JwtPayload {
  sub: string;   // ✅ sub é string
  email: string;
}

// Type Guard correto
function isTokenPayload(payload: JwtPayload): payload is TokenPayload {
  return (
    typeof payload.sub === "string" &&
    typeof (payload as any).email === "string"
  );
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (
      typeof decoded !== "object" ||
      !isTokenPayload(decoded)
    ) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = {
      id: Number(decoded.sub), // ✅ conversão segura
      email: decoded.email,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}

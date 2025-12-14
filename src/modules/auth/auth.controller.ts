import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";

const service = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body);
    const usuario = await service.register(data);

    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    });
  }

  async login(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);
    const result = await service.login(data.email, data.senha);

    return res.json(result);
  }
}

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export class AuthService {
  async register(data: { nome: string; email: string; senha: string }) {
    const senhaHash = await bcrypt.hash(data.senha, 10);

    return prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: senhaHash,
      },
    });
  }

  async login(email: string, senha: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new Error("Email ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error("Email ou senha inválidos");
    }

    const token = jwt.sign(
      { sub: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
    };
  }
}

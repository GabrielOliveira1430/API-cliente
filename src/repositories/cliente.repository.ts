import { prisma } from "../prisma/client";
import { CreateClienteDTO } from "../dtos/cliente.dto";

export class ClienteRepository {
  create(data: CreateClienteDTO) {
    return prisma.cliente.create({ data });
  }

  findByEmail(email: string) {
    return prisma.cliente.findUnique({ where: { email } });
  }

  findAll() {
    return prisma.cliente.findMany();
  }
}

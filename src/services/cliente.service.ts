import { prisma } from "../../src/prisma/client";

interface CreateClienteDTO {
  nome: string;
  email: string;
  telefone?: string;
}

export class ClienteService {
  async create(data: CreateClienteDTO) {
    return prisma.cliente.create({ data });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [clientes, total] = await Promise.all([
      prisma.cliente.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.cliente.count(),
    ]);

    return {
      data: clientes,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number) {
    return prisma.cliente.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Partial<CreateClienteDTO>) {
    return prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    await prisma.cliente.delete({
      where: { id },
    });
  }
}

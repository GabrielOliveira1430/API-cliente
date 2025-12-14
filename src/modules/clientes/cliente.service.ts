import { prisma } from "../../prisma/client"

interface CreateClienteDTO {
  nome: string;
  email: string;
  telefone?: string;
}

interface UpdateClienteDTO {
  nome?: string;
  email?: string;
  telefone?: string;
}

export class ClienteService {
  async create(data: CreateClienteDTO) {
    return prisma.cliente.create({
      data,
    });
  }

  async findAll(page = 1, limit = 10) {
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
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number) {
    return prisma.cliente.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateClienteDTO) {
    return prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return prisma.cliente.delete({
      where: { id },
    });
  }
}

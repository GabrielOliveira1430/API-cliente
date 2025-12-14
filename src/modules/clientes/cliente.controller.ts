import { Request, Response } from "express";
import { ClienteService } from "./cliente.service";
import {
  createClienteSchema,
  updateClienteSchema,
} from "./cliente.schema";
import { clienteIdParamSchema } from "./cliente.params.schema";
import { paginationQuerySchema } from "../../shared/schemas/pagination.schema";

const service = new ClienteService();

export class ClienteController {
  async create(req: Request, res: Response) {
    const data = createClienteSchema.parse(req.body);
    const cliente = await service.create(data);
    return res.status(201).json(cliente);
  }

  async list(req: Request, res: Response) {
    const { page, limit } = paginationQuerySchema.parse(req.query);
    const result = await service.findAll(page, limit);
    return res.json(result);
  }

  async find(req: Request, res: Response) {
    const { id } = clienteIdParamSchema.parse(req.params);
    const cliente = await service.findById(id);

    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }

    return res.json(cliente);
  }

  async update(req: Request, res: Response) {
    const { id } = clienteIdParamSchema.parse(req.params);
    const data = updateClienteSchema.parse(req.body);

    const cliente = await service.update(id, data);
    return res.json(cliente);
  }

  async delete(req: Request, res: Response) {
    const { id } = clienteIdParamSchema.parse(req.params);
    await service.delete(id);
    return res.status(204).send();
  }
}

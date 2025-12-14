import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";
import { createClienteSchema } from "../dtos/cliente.dto";

const service = new ClienteService();

export class ClienteController {
  async create(req: Request, res: Response) {
    const data = createClienteSchema.parse(req.body);
    const cliente = await service.create(data);
    return res.status(201).json(cliente);
  }

  async list(req: Request, res: Response) {
    const clientes = await service.list();
    return res.json(clientes);
  }
}

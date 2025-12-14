import { Router } from "express";
import { ClienteController } from "../../src/modules/clientes/cliente.controller";
import { authMiddleware } from "../../src/middlewares/auth.middleware";

const routes = Router();
const controller = new ClienteController();

routes.use(authMiddleware);

routes.post("/", controller.create);
routes.get("/", controller.list);
routes.get("/:id", controller.find);
routes.put("/:id", controller.update);
routes.delete("/:id", controller.delete);

export default routes;

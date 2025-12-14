import { Router } from "express";
import { ClienteController } from "./cliente.controller";

const router = Router();
const controller = new ClienteController();

router.post("/", controller.create);
router.get("/", controller.list);
router.get("/:id", controller.find);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;

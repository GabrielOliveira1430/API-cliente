import { Router } from "express";
import { AuthController } from "./auth.controller";

const routes = Router();
const controller = new AuthController();

routes.post("/register", controller.register);
routes.post("/login", controller.login);

export default routes;

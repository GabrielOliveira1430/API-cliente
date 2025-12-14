import express from "express";
import cors from "cors";

import { errorMiddleware } from "./middlewares/error.middleware";
import clienteRoutes from "./modules/clientes/cliente.routes";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

// rotas
app.use("/clientes", clienteRoutes);
app.use("/auth", authRoutes);

// middleware de erro (SEMPRE por último)
app.use(errorMiddleware);

export default app;

import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import { authRoutes } from "./routes/auth.routes";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: true,
  });

  app.register(jwt, {
    secret: process.env.JWT_SECRET ?? "troque-esta-chave-em-producao",
  });

  app.register(authRoutes);

  app.get("/health", async () => ({ status: "ok" }));

  return app;
}

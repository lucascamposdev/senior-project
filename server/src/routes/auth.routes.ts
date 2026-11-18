import { FastifyInstance } from "fastify";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { authenticate } from "../plugins/authenticate";

interface LoginBody {
  username: string;
  password: string;
}

export async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: LoginBody }>("/login", async (request, reply) => {
    const { username, password } = request.body;

    if (!username || !password) {
      return reply.code(400).send({ message: "Usuário e senha são obrigatórios" });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return reply.code(401).send({ message: "Usuário ou senha inválidos" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return reply.code(401).send({ message: "Usuário ou senha inválidos" });
    }

    const token = app.jwt.sign(
      { sub: user.id, username: user.username },
      { expiresIn: "8h" }
    );

    return reply.send({ token });
  });

  app.get("/me", { preHandler: authenticate }, async (request, reply) => {
    const { sub, username } = request.user;

    const user = await prisma.user.findUnique({ where: { id: sub } });

    if (!user) {
      return reply.code(404).send({ message: "Usuário não encontrado" });
    }

    return reply.send({ id: user.id, username });
  });
}

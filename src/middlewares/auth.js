// src/middlewares/auth.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    // Se não tiver Authorization no header → erro
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return res.status(401).json({ error: "Token de autenticação ausente ou inválido" });
    }

    // Pega só a parte depois de "Basic "
    const base64Token = authHeader.split(" ")[1];

    // Decodifica Base64 para texto normal "username:password"
    const decoded = Buffer.from(base64Token, "base64").toString("utf-8");

    const [username, password] = decoded.split(":");

    // Busca usuário no banco
    const user = await prisma.user.findUnique({
      where: { username },
    });

    // Valida credenciais
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // Se ok → coloca user no req para ser usado no controller/admin
    req.user = user;

    return next(); // segue para a próxima etapa (controller ou admin middleware)
  } catch (error) {
    console.error("Erro no middleware de autenticação:", error);
    return res.status(500).json({ error: "Erro no middleware de autenticação" });
  }
}

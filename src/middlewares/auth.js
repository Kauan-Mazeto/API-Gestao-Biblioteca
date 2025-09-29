import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("basic ")) {
        return res.status(401).json({ error: "Token de autenticação não fornecido" });
    }

    try {
        const base64Credentials = authHeader.split(" ")[1];
        const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");

        const [username, password] = credentials.split(":");

        if (!username || !password) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Usuário ou senha inválidos" });
        }

        
        req.user = {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
        };

        next();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro no processo de autenticação" });
    }
}
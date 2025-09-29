import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function verificarUsuario(req, res, next) {

    try {

        const user = await prisma.user.findUnique({ where: { id: req.user.id } });

        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: "Acesso negado. Apenas administradores podem usar esta rota." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao verificar usuário" });
    }

    next();
}
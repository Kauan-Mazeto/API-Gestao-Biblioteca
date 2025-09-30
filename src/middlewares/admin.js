import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function verificarUsuario(req, res, next) {
    
    try {

        // REVER
        const id = parseInt(req.user.id)

        // verificar se o usuario existe no banco
        const user = await prisma.user.findUnique({
            where: {id:Number(id)}
        })

        // verifcar SE existe e SE é admin
        if (!user || !user.isAdmin) {
            return res.status(403).json({ mensagem: "somente admin pode realizar essa funcionalidade" });
        }

        next();

    } catch(error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    }
}
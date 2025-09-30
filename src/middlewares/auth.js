// src/middlewares/auth.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ mensagem: 'Autenticação necessária' });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (!username || !password) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }

    try {
        const usuario = await prisma.user.findUnique({
            where: { 
                username: username 
            }
        });

        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ mensagem: 'Usuário ou senha incorretos' });
        }

        req.user = usuario;

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
}


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function registrarUsuario(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username e password são obrigatórios" });
    }

    if (password.length < 4) {
        return res.status(400).json({ error: "Senha deve ter no mínimo 4 caracteres" });
    }

    try {
        
        const existe = await prisma.user.findUnique({ 
            where: { username } 
        });

        if (existe) {
            return res.status(400).json({ error: "Username já existe" });
        }


        const totalDeUsuarios = await prisma.user.count();
        const isAdmin = totalDeUsuarios === 0;

        const newUser = await prisma.user.create({
            data: { 
                username, 
                password, 
                isAdmin 
            }
        });

        res.status(201).json({
            message: "Usuário registrado com sucesso",
            userId: newUser.id,
            isAdmin: newUser.isAdmin,
        });
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
}

export { registrarUsuario };
export function verificarUsuario(req, res, next) {

    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: "Acesso negado. Apenas administradores podem usar esta rota." });
    }

    next();
}
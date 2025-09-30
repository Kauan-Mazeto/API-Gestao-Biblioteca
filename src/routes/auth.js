import { Router } from 'express';
import { registrarUsuario } from '../controller/auth-controller.js';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
    registrarUsuario(req, res)
    res.send("Registro de usuário");
});

export default authRouter;
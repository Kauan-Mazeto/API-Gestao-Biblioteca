import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';

const authRouter = Router();

authRouter.post('/register', (req, res) => {
    res.send("Registro de usuário");
});

export default authRouter;
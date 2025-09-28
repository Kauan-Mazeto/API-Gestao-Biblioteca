import Router from 'express';
import { verificarUsuario } from '../middlewares/auth';

const authRouter = Router();


authRouter.use(verificarUsuario);

authRouter.post('/register', (req, res) => {
    res.send("Registro de usuário");
});

export default authRouter;
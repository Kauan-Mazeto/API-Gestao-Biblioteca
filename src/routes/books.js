import Router from 'express';
import { verificarUsuario } from '../middlewares/auth';
import { pegarTodosOsLivros, pegarLivroPorId, criarNovoLivro, atualizarLivro, deletarLivro, borrowLivro, returnLivro } from '../controller/books-controller';

const booksRouter = Router();
booksRouter.use(authMiddleware);

booksRouter.get('/', (req, res) => {
    pegarTodosOsLivros(req, res);
    res.status(200).json({ message: "Lista de livros" });
});

booksRouter.get('/:id', (req, res) => {
    pegarLivroPorId(req, res);
    res.status(200).json({ message: "Detalhes do livro" });
});

booksRouter.post('/', verificarUsuario, (req, res) => {
    criarNovoLivro(req, res);
    res.status(201).json({ message: "Livro criado" });
});

booksRouter.patch('/:id', verificarUsuario, (req, res) => {
    atualizarLivro(req, res);
    res.status(200).json({ message: "Livro atualizado" });
});

booksRouter.delete('/:id', verificarUsuario, (req, res) => {
    deletarLivro(req, res);
    res.status(200).json({ message: "Livro deletado" });
});

booksRouter.post('/:id/borrow', (req, res) => {
    borrowLivro(req, res);
    res.status(200).json({ message: "Livro emprestado" });
});

booksRouter.post('/:id/return', (req, res) => {
    returnLivro(req, res);
    res.status(200).json({ message: "Livro devolvido" });
});

export default booksRouter;
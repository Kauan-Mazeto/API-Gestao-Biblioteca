import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function pegarTodosOsLivros(req, res) {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar livros" });
    }
};

async function pegarLivroPorId(req, res) {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({ where: { id: Number(id) } });

        if (!book) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }

        res.json(book);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar livro" });
    }
};

async function criarNovoLivro(req, res) {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: "Título e autor são obrigatórios" });
    }
    try {
        const newBook = await prisma.book.create({
            data: { title, author, available: true }
        });

        res.status(201).json({ message: "Livro criado", book: newBook });
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar livro" });
    }
}

async function atualizarLivro(req, res) {
    const { id } = req.params;
    const { title, author, available } = req.body;

    try {
        const updated = await prisma.book.update({
            where: { id: Number(id) },
            data: { title, author, available }
        });

        res.json({ message: "Livro atualizado", book: updated });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar livro" });
    }
}

async function deletarLivro(req, res) {
    const { id } = req.params;

    try {
        await prisma.book.delete({ 
            where: { id: Number(id) } 
        });

        res.json({ message: "Livro deletado" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar livro" });
    }
}

async function  borrowLivro(req, res) {
    const { id } = req.params;

    try {
        const livro = await prisma.livro.findUnique({ 
            where: { id: Number(id) } 
        });
        
        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }
        if (!livro.available) {
            return res.status(400).json({ error: "Livro já emprestado" });
        }

        await prisma.livro.update({
            where: { id: Number(id) },
            data: { available: false }
        });

        res.json({ message: `Você pegou o livro '${livro.title}' emprestado.` });
    } catch (err) {
        res.status(500).json({ error: "Erro ao emprestar livro" });
    }
}

async function returnLivro(req, res) {
    const { id } = req.params;

    try {
        const livro = await prisma.livro.findUnique({
            where: { id: Number(id) } 
        });

        if (!livro) {
            return res.status(404).json({ error: "Livro não encontrado" });
        }
        if (livro.available) {
            return res.status(400).json({ error: "Livro já está disponível" });
        }

        await prisma.livro.update({
            where: { id: Number(id) },
            data: { available: true }
        });

        res.json({ message: `Você devolveu o livro '${livro.title}'.` });
    } catch (err) {
        res.status(500).json({ error: "Erro ao devolver livro" });
    }
}

export { pegarTodosOsLivros, pegarLivroPorId, criarNovoLivro, atualizarLivro, deletarLivro, borrowLivro, returnLivro };
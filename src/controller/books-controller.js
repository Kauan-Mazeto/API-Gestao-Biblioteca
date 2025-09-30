// controllers/books.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Listar todos os livros
export async function getBooks (req, res) {

  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
};


export async function getBookById (req, res) {
    try {
        const id = parseInt(req.params.id);
        const book = await prisma.book.findUnique( 
            {
                where: {
                    id:Number(id)
                }
            }
        );

        if(isNaN(id)) {
            return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
        };

        if (!book) {
            return res.status(404).json({ mensagem: "livro não encontrado" });
        };

        res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };

};

export async function createBook  (req, res)  {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "Título e autor são obrigatórios" });
  }
  try {
    const book = await prisma.book.create({
      data: { title, author },
    });
    res.status(201).json({ message: "Livro criado com sucesso", book });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar livro" });
  }
};

export async function updateBook (req, res)  {
    
    const {title, author} = req.body;

    if (!title || !author) {
        return res.status(400).json({ mensagem: "Titulo e autor são obrigatórios" });
    };

    try {
        const novoLivro = await prisma.book.create({
            data: {
                title:title,
                author:author
            }
        });

        // return res.status(201).json({ mensagem: `O Livro ${title} foi cadastrado com sucesso!` });
        return res.status(201).json({ mensagem: `O Livro foi cadastrado com sucesso!` ,novoLivro });


    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};


export async function deleteBook (req, res) {
    const idLivro = parseInt(req.params.id);
    
    if(isNaN(idLivro)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    };

    if (!idLivro) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    };  

    try {
        const removerLivro = await prisma.book.delete({
            where: {
                id:Number(idLivro)
            }
        });

        res.status(200).json({mensagem: 'o livro foi deletado'});

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
    
};

export async function borrowBook (req, res)  {
    const idLivroEmprestimo = parseInt(req.params.id);

    if(isNaN(idLivroEmprestimo)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    };


    if (!idLivroEmprestimo) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    };


    try {
        const idLivro = await prisma.book.findUnique({
            where: {
                id:Number(idLivroEmprestimo)
            }
        });

        if (!idLivro) {
            return res.status(404).json({mensagem: "o livro nao existe no banco de dados"});
        };



        if (!idLivro.available) {
            return res.status(400).json({ mensagem: "o livro já está emprestado" });
        };


        const updateLivro = await prisma.book.update({
            where: {
                id:Number(idLivroEmprestimo)
            },

            data: {
                available: false
            }

        });

        res.status(200).json({mensagem: "o livro foi emprestado"})

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};

export async function returnBook (req, res) {
  const idLivroEmprestado = parseInt(req.params.id);

    if(isNaN(idLivroEmprestado)) {
        return res.status(400).json({ mensagem: "ID inválido, precisa ser um numero" });
    };


    if (!idLivroEmprestado) {
        return res.status(400).json({mensagem: "é necessario um ID para realizar a tarefa"});
    };


    try {
        const idLivroEncontrado = await prisma.book.findUnique({
            where: {
                id:Number(idLivroEmprestado)
            }
        });

        if (!idLivroEncontrado) {
            return res.status(404).json({mensagem: "o livro nao existe no banco de dados"});
        };



        if (idLivroEncontrado.available) {
            return res.status(400).json({ mensagem: "o livro nao está emprestado" });
        };


        const updateLivro = await prisma.book.update({
            where: {
                id:Number(idLivroEmprestado)
            },

            data: {
                available: true
            }

        });

        res.status(200).json({mensagem: "o livro foi devolvido"})

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno no servidor" });
    };
};

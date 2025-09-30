import express from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook,borrowBook, returnBook,} from "../controller/books-controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { verificarUsuario } from "../middlewares/admin.js";

const booksRouter = express.Router();

booksRouter.get("/", authMiddleware,  (req, res) => {
    getBooks(req, res);
});

booksRouter.get("/:id", authMiddleware, (req, res) => {
    getBookById(req, res);
});

booksRouter.post("/", authMiddleware, verificarUsuario, (req, res) => {
    createBook(req, res);
});

booksRouter.patch("/:id", authMiddleware, verificarUsuario, (req, res) => {
    updateBook(req, res)
});

booksRouter.delete("/:id", authMiddleware, verificarUsuario, (req, res) => {
    deleteBook(req, res);
});

booksRouter.post("/:id/borrow", authMiddleware, (req, res) => {
    borrowBook(req, res);
});

booksRouter.post("/:id/return", authMiddleware, (req, res) => {
    returnBook(req, res)
});

export default booksRouter;

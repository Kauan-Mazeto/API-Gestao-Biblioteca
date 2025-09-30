import express from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook,borrowBook, returnBook,} from "../controller/books-controller.js";
import { authMiddleware } from "../middlewares/auth.js";
import { verificarUsuario } from "../middlewares/admin.js";

const booksRouter = express.Router();

booksRouter.get("/",  (req, res) => {
    getBooks(req, res);
});

booksRouter.get("/:id",  (req, res) => {
    getBookById(req, res);
});

booksRouter.post("/", (req, res) => {
    createBook(req, res);
});

booksRouter.patch("/:id", (req, res) => {
    updateBook(req, res)
});

booksRouter.delete("/:id", (req, res) => {
    deleteBook(req, res);
});

booksRouter.post("/:id/borrow",  (req, res) => {
    borrowBook(req, res);
});

booksRouter.post("/:id/return",  (req, res) => {
    returnBook(req, res)
});

export default booksRouter;

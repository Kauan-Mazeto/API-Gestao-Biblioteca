import express from 'express';
import booksRouter from './routes/books.js';
import authRouter from './routes/auth.js';

const app = express();
app.use(express.json());

app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Servidor rodando!');
});
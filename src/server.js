import express from 'express';

const app = express();
app.use(express.json());

app.use('/books', booksRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
  console.log('Servidor rodando!');
});
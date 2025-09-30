# API de Gestão de Biblioteca

Projeto final de uma API REST simplificada para gerenciar livros de uma biblioteca, com autenticação básica e diferenciação entre usuários comuns e administradores.

---

# Tecnologias
- Node.js
- Express.js
- Prisma ORM
- SQLite
- Postman (para testes)

# Token de Autenticação

- kauan:1234
- Basic a2F1YW46MTIzNA==


# Rotas

## Auth
| Método | URL             | Permissão | Descrição           |
|--------|-----------------|-----------|-------------------|
| POST   | /auth/register  | Pública   | Criar novo usuário |

## Livros
| Método | URL                     | Permissão    | Descrição            |
|--------|-------------------------|-------------|--------------------|
| GET    | /books                  | User/Admin  | Listar todos os livros |
| GET    | /books/:id              | User/Admin  | Detalhes de 1 livro |
| POST   | /books                  | Admin       | Criar livro         |
| PATCH  | /books/:id              | Admin       | Atualizar livro     |
| DELETE | /books/:id              | Admin       | Deletar livro       |
| POST   | /books/:id/borrow       | User/Admin  | Pegar emprestado    |
| POST   | /books/:id/return       | User/Admin  | Devolver livro      |

---

# Banco de Dados

## Tabelas

- **users**
  - `id` (INTEGER, PK)
  - `username` (TEXT, único, obrigatório)
  - `password` (TEXT, obrigatório)
  - `isAdmin` (BOOLEAN, default: false)

- **books**
  - `id` (INTEGER, PK)
  - `title` (TEXT, obrigatório)
  - `author` (TEXT, obrigatório)
  - `available` (BOOLEAN, default: true)


---

# Instalação

```bash
git clone <url-do-repositório>
cd API-Gestao-Biblioteca
npm install
npx prisma migrate dev --name init
node prisma/server.js # popular banco
npm start

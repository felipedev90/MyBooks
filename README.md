# MyBooks — Catálogo de Livros (React + TypeScript + CRUDCrud)

Aplicação em **React com TypeScript** que exibe um catálogo de livros e realiza operações de **listagem (GET)**, **adição (POST)** e **remoção (DELETE)** consumindo uma API real via **crudcrud.com**.

> UI estilizada com **Tailwind CSS**.

---

## Funcionalidades

- Listar livros cadastrados na API (GET)
- Adicionar livro (title, author, status: "Lido" | "Não lido") (POST)
- Remover livro (DELETE)

---

## Estrutura de Componentes

- **Header**: topo com identidade visual (opcional: contador de livros)
- **BookForm**: formulário controlado para adicionar um livro
- **BookList**: renderiza a lista de livros (inclui estado vazio)
- **BookItem**: representa um livro individual e suas ações (remover)

---

## Tipagem (TypeScript)

Arquivo: `src/types/book.ts`

- `BookStatus = "Lido" | "Não lido"`
- `Book`: estrutura do livro retornado pela API
- `BookInput`: estrutura usada para criar livro (sem `_id`)

Exemplo (conceitual):

- **Book**: `{ _id, title, author, status }`
- **BookInput**: `{ title, author, status }`

---

## Integração com a API (crudcrud.com)

A API é fornecida pelo serviço CRUDCrud.

Endpoints utilizados:

- `GET /livros` → lista todos os livros
- `POST /livros` → cria um livro
- `DELETE /livros/:id` → remove um livro pelo `_id`
- `PUT /livros/:id` → atualiza status

### Configuração do endpoint

No arquivo `src/services/booksApi.ts`, ajuste a constante:

```ts
const API_URL = "https://crudcrud.com/api/SEU_TOKEN/livros";
```

tokens do CRUDCrud expiram e podem precisar ser regenerados.

## Como rodar o projeto

Pré-requisitos

- Node.js
- npm

**Passos**

Instale as dependências:

`npm install`

Rode o projeto:

`npm run dev`

Abra no navegador (Vite geralmente usa):

`http://localhost:5173`

## Decisões técnicas

- TypeScript: tipagem explícita para Book, BookInput, BookStatus, props e eventos do form.
- Camada de serviço (services/booksApi.ts): centraliza as chamadas HTTP para manter os componentes mais limpos.
- Estado no App: books, loading, error e handlers (handleAdd, handleRemove) controlam o fluxo principal.
- Tailwind: estilização rápida e consistente com classes utilitárias.

## Estrutura de pastas

```text
src/
├─ components/
│  ├─ BookForm.tsx
│  ├─ BookItem.tsx
│  ├─ BookList.tsx
│  └─ Header.tsx
├─ services/
│  └─ booksApi.ts
├─ types/
│  └─ book.ts
├─ App.tsx
├─ main.tsx
└─ index.css
```

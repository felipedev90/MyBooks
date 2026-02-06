import { useEffect, useState } from "react";
import Header from "./components/Header";

import type { Book, BookInput } from "./types/book";
import { createBook, deleteBook, getBooks } from "./services/booksApi";

import BookForm from "./components/BookForm";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await getBooks();
        setBooks(data);
      } catch (e) {
        console.error("Falha ao carregar livros", e);
        setError("Falha ao carregar livros");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  async function handleAdd(payload: BookInput) {
    const created = await createBook(payload);
    setBooks((prev) => [created, ...prev]); // novo no topo
  }

  async function handleRemove(id: string) {
    await deleteBook(id);
    setBooks((prev) => prev.filter((book) => book._id !== id));
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header count={books.length} />

      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm">
          <h1 className="text-xl font-semibold tracking-tight">
            Catálogo de Livros
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Adicione, liste e remova seus livros favoritos.
          </p>

          <div className="mt-5">
            <BookForm onAdd={handleAdd} />
          </div>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Meus livros</h2>
            <span className="text-xs text-zinc-400">Total: {books.length}</span>
          </div>

          <div className="mt-4">
            {loading ? (
              <div className="animate-pulse space-y-3">
                <div className="h-4 w-2/3 rounded bg-zinc-800" />
                <div className="h-4 w-1/2 rounded bg-zinc-800" />
                <div className="h-4 w-3/5 rounded bg-zinc-800" />
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-900/50 bg-red-950/30 p-4">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            ) : books.length === 0 ? (
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4">
                <p className="text-sm text-zinc-300">
                  Nenhum livro cadastrado.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Use o formulário acima para adicionar seu primeiro livro.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                {books.map((book) => (
                  <li
                    key={book._id}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/30 p-4 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="font-medium leading-5 truncate">
                        {book.title}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400 truncate">
                        {book.author}
                      </p>

                      <span
                        className={[
                          "mt-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          book.status === "Lido"
                            ? "bg-emerald-950/40 text-emerald-200 border border-emerald-900/40"
                            : "bg-amber-950/40 text-amber-200 border border-amber-900/40",
                        ].join(" ")}
                      >
                        {book.status}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(book._id)}
                      className="shrink-0 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm hover:bg-zinc-800 active:scale-[0.99]"
                      aria-label={`Remover ${book.title}`}
                      title="Remover"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

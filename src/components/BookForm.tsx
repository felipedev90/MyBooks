import { useState } from "react";
import type { BookInput, BookStatus } from "../types/book";

type BookFormProps = {
  onAdd: (payload: BookInput) => Promise<void>;
};

export default function BookForm({ onAdd }: BookFormProps) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<BookStatus>("Não lido");
  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const t = title.trim();
    const a = author.trim();
    if (!t || !a) return;

    setSubmitting(true);
    try {
      await onAdd({ title: t, author: a, status });
      setTitle("");
      setAuthor("");
      setStatus("Não lido");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-sm text-zinc-300">Título</label>
          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-zinc-600"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Clean Code"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-zinc-300">Autor</label>
          <input
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-zinc-600"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ex: Robert C. Martin"
          />
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1.5">
          <label className="text-sm text-zinc-300">Status</label>
          <select
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm outline-none focus:border-zinc-600"
            value={status}
            onChange={(e) => setStatus(e.target.value as BookStatus)}
          >
            <option value="Não lido">Não lido</option>
            <option value="Lido">Lido</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white disabled:opacity-60 disabled:hover:bg-zinc-100"
        >
          {submitting ? "Salvando..." : "Salvar livro"}
        </button>
      </div>
    </form>
  );
}

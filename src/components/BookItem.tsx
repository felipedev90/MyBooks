import type { Book } from "../types/book";

type BookItemProps = {
  book: Book;
  onRemove: (id: string) => Promise<void>;
  onToggleStatus?: (book: Book) => Promise<void>;
};

export default function BookItem({
  book,
  onRemove,
  onToggleStatus,
}: BookItemProps) {
  return (
    <li style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        <strong>{book.title}</strong> — {book.author}{" "}
        <em style={{ marginLeft: 8 }}>({book.status})</em>
      </div>

      {onToggleStatus && (
        <button type="button" onClick={() => onToggleStatus(book)}>
          Alternar status
        </button>
      )}

      <button type="button" onClick={() => onRemove(book._id)}>
        Remover
      </button>
    </li>
  );
}

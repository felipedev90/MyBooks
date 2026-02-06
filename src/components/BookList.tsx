import type { Book } from "../types/book";
import BookItem from "./BookItem";

type BookListProps = {
  books: Book[];
  onRemove: (id: string) => Promise<void>;
  onToggleStatus?: (book: Book) => Promise<void>;
};

export default function BookList({
  books,
  onRemove,
  onToggleStatus,
}: BookListProps) {
  if (books.length === 0) return <p>Nenhum livro cadastrado.</p>;

  return (
    <div>
      <h2>Meus livros</h2>
      <ul style={{ display: "grid", gap: 8, paddingLeft: 16 }}>
        {books.map((book) => (
          <BookItem
            key={book._id}
            book={book}
            onRemove={onRemove}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </ul>
    </div>
  );
}

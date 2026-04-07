export type BookStatus = "Lido" | "Não lido";

export type Book = {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
};

export type BookInput = Omit<Book, "id">;

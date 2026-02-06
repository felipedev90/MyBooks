export type BookStatus = "Lido" | "Não lido";

export type Book = {
  title: string;
  author: string;
  status: BookStatus;
  _id: string;
};

export type BookInput = Omit<Book, "_id">;

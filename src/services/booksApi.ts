import type { Book, BookInput } from "../types/book";

const API_URL =
  "https://crudcrud.com/api/1f39ac4e38e342d2bb95f1cc1af7cec6/livros";

export async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return (await res.json()) as Book[];
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function createBook(payload: BookInput): Promise<Book> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return (await res.json()) as Book;
  } catch (error) {
    console.error("Post error:", error);
    throw error;
  }
}

export async function deleteBook(id: string): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
}

export async function updateBookStatus(
  id: string,
  status: Book["status"],
): Promise<Book> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    return { _id: id, title: "", author: "", status } as Book;
  } catch (error) {
    console.error("Put error:", error);
    throw error;
  }
}

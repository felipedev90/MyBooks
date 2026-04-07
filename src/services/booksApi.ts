import { createClient } from "@supabase/supabase-js";
import type { Book, BookInput } from "../types/book";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getBooks(): Promise<Book[]> {
  try {
    const { data, error } = await supabase.from("livros").select("*");

    if (error) throw error;
    return data as Book[];
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function createBook(payload: BookInput): Promise<Book> {
  try {
    const { data, error } = await supabase
      .from("livros")
      .insert([payload])
      .select()
      .single(); // .single() garante que retorne o objeto, e não um array

    if (error) throw error;
    return data as Book;
  } catch (error) {
    console.error("Post error:", error);
    throw error;
  }
}

export async function deleteBook(id: string): Promise<void> {
  try {
    const { error } = await supabase.from("livros").delete().eq("id", id); // Filtra pelo ID

    if (error) throw error;
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
    const { data, error } = await supabase
      .from("livros")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Book;
  } catch (error) {
    console.error("Put error:", error);
    throw error;
  }
}

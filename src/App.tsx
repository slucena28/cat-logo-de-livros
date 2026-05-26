import { useEffect, useState } from "react";

import { api } from "./services/api";

import { Book } from "./types/Book";

import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const [loading, setLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string>("");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks(): Promise<void> {
    try {
      setLoading(true);

      setError("");

      const response =
        await api.get<Book[]>("");

      setBooks(response.data);
    } catch (err) {
      console.error(err);

      setError(
        "Erro ao carregar os livros."
      );
    } finally {
      setLoading(false);
    }
  }

  async function addBook(
    book: Book
  ): Promise<void> {
    try {
      const response =
        await api.post<Book>("", book);

      setBooks((prevBooks) => [
        ...prevBooks,
        response.data,
      ]);
    } catch (err) {
      console.error(err);

      setError(
        "Erro ao adicionar livro."
      );
    }
  }

  async function deleteBook(
    id: string
  ): Promise<void> {
    try {
      await api.delete(`/${id}`);

      setBooks((prevBooks) =>
        prevBooks.filter(
          (book) => book._id !== id
        )
      );
    } catch (err) {
      console.error(err);

      setError(
        "Erro ao remover livro."
      );
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Biblioteca</h1>

      <BookForm onAddBook={addBook} />

      {loading && <p>Carregando...</p>}

      {error && <p>{error}</p>}

      <BookList
        books={books}
        onDelete={deleteBook}
      />
    </div>
  );
}

export default App;

// src/App.tsx

import { useEffect, useState } from "react";
import axios from "axios";

import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";

export interface Book {
  _id?: string;
  title: string;
  author: string;
  status: "Lido" | "Não lido";
}

const API_URL =
  "https://crudcrud.com/api/SEU_ENDPOINT/livros";

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Carrega os livros ao iniciar a aplicação
  useEffect(() => {
    fetchBooks();
  }, []);

  // GET
  async function fetchBooks(): Promise<void> {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<Book[]>(API_URL);

      setBooks(response.data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar livros.");
    } finally {
      setLoading(false);
    }
  }

  // POST
  async function addBook(book: Book): Promise<void> {
    try {
      const response = await axios.post<Book>(
        API_URL,
        book
      );

      setBooks((prevBooks) => [
        ...prevBooks,
        response.data,
      ]);
    } catch (err) {
      console.error(err);
      setError("Erro ao adicionar livro.");
    }
  }

  // DELETE
  async function deleteBook(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (err) {
      console.error(err);
      setError("Erro ao remover livro.");
    }
  }

  // PUT (opcional)
  async function toggleStatus(book: Book): Promise<void> {
    try {
      const updatedBook: Book = {
        title: book.title,
        author: book.author,
        status:
          book.status === "Lido"
            ? "Não lido"
            : "Lido",
      };

      await axios.put(
        `${API_URL}/${book._id}`,
        updatedBook
      );

      setBooks((prevBooks) =>
        prevBooks.map((item) =>
          item._id === book._id
            ? {
                ...item,
                status: updatedBook.status,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar status.");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Biblioteca</h1>

      <BookForm onAddBook={addBook} />

      {loading && <p>Carregando livros...</p>}

      {error && <p>{error}</p>}

      <BookList
        books={books}
        onDelete={deleteBook}
        onToggleStatus={toggleStatus}
      />
    </div>
  );
}

export default App;

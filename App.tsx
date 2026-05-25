import { useEffect, useState } from "react";
import { Book } from "./types/Book";
import { api } from "./services/api";

import { BookForm } from "./components/BookForm";
import { BookList } from "./components/BookList";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  async function fetchBooks() {
    try {
      const response = await api.get("/");
      setBooks(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros", error);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  async function handleAddBook(book: Book) {
    try {
      const response = await api.post("/", book);

      setBooks((prevBooks) => [
        ...prevBooks,
        response.data,
      ]);
    } catch (error) {
      console.error("Erro ao adicionar livro", error);
    }
  }

  async function handleDeleteBook(id: string) {
    try {
      await api.delete(`/${id}`);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error("Erro ao remover livro", error);
    }
  }

  return (
    <div>
      <h1>Biblioteca</h1>

      <BookForm onAddBook={handleAddBook} />

      <BookList
        books={books}
        onDelete={handleDeleteBook}
      />
    </div>
  );
}

export default App;

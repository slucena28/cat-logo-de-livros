// src/components/BookItem.tsx

import { Book } from "../App";

interface BookItemProps {
  book: Book;

  onDelete: (id: string) => Promise<void>;

  onToggleStatus: (
    book: Book
  ) => Promise<void>;
}

export function BookItem({
  book,
  onDelete,
  onToggleStatus,
}: BookItemProps) {
  return (
    <li
      style={{
        border: "1px solid #ccc",
        marginBottom: "10px",
        padding: "10px",
      }}
    >
      <h3>{book.title}</h3>

      <p>Autor: {book.author}</p>

      <p>Status: {book.status}</p>

      <button
        onClick={() =>
          onToggleStatus(book)
        }
      >
        Alterar Status
      </button>

      <button
        onClick={() =>
          onDelete(book._id!)
        }
      >
        Remover
      </button>
    </li>
  );
}

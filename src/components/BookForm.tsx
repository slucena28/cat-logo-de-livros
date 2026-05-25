import { Book } from "../types/Book";

interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
}

export function BookItem({ book, onDelete }: BookItemProps) {
  return (
    <li>
      <h3>{book.title}</h3>

      <p>Autor: {book.author}</p>

      <p>Status: {book.status}</p>

      <button onClick={() => onDelete(book._id!)}>
        Remover
      </button>
    </li>
  );
}

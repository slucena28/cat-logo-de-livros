import { Book } from "../types/Book";
import { BookItem } from "./BookItem";

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
}

export function BookList({ books, onDelete }: BookListProps) {
  return (
    <ul>
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

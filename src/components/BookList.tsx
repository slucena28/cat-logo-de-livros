// src/components/BookList.tsx

import { Book } from "../App";
import { BookItem } from "./BookItem";

interface BookListProps {
  books: Book[];

  onDelete: (id: string) => Promise<void>;

  onToggleStatus: (
    book: Book
  ) => Promise<void>;
}

export function BookList({
  books,
  onDelete,
  onToggleStatus,
}: BookListProps) {
  return (
    <ul>
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  );
}

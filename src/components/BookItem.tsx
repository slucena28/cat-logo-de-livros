import { useState, FormEvent } from "react";
import { Book } from "../types/Book";

interface BookFormProps {
  onAddBook: (book: Book) => void;
}

export function BookForm({ onAddBook }: BookFormProps) {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<"Lido" | "Não lido">("Não lido");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !author) return;

    onAddBook({
      title,
      author,
      status,
    });

    setTitle("");
    setAuthor("");
    setStatus("Não lido");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Autor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value as "Lido" | "Não lido")
        }
      >
        <option value="Lido">Lido</option>
        <option value="Não lido">Não lido</option>
      </select>

      <button type="submit">Adicionar</button>
    </form>
  );
}

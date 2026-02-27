"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string) => Promise<void>;
};

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setIsLoading(true);
    await onAdd(trimmed);
    setTitle("");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="新しいTodoを入力..."
        disabled={isLoading}
        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isLoading || title.trim() === ""}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
      >
        追加
      </button>
    </form>
  );
}

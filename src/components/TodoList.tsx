"use client";

import { useState } from "react";
import type { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";
import TodoForm from "@/components/TodoForm";

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: Props) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAdd = async (title: string) => {
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) return;
    const newTodo: Todo = await res.json();
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = async (id: number, is_done: boolean) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_done }),
    });
    if (!res.ok) return;
    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const handleRename = async (id: number, title: string) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (!res.ok) return;
    const updated: Todo = await res.json();
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
    if (!res.ok) return;
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const remaining = todos.filter((t) => !t.is_done).length;

  return (
    <div>
      <TodoForm onAdd={handleAdd} />

      {todos.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-12">
          Todoがありません。追加してみましょう！
        </p>
      ) : (
        <>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            ))}
          </ul>
          <p className="mt-4 text-xs text-gray-400 text-right">
            残り {remaining} / {todos.length} 件
          </p>
        </>
      )}
    </div>
  );
}

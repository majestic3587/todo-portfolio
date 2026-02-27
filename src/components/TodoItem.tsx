"use client";

import { useState, useRef, useEffect } from "react";
import type { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: number, is_done: boolean) => Promise<void>;
  onRename: (id: number, title: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export default function TodoItem({ todo, onToggle, onRename, onDelete }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleToggle = async () => {
    setIsLoading(true);
    await onToggle(todo.id, !todo.is_done);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    await onDelete(todo.id);
    setIsLoading(false);
  };

  const startEditing = () => {
    if (todo.is_done) return;
    setEditTitle(todo.title);
    setIsEditing(true);
  };

  const commitEdit = async () => {
    const trimmed = editTitle.trim();
    setIsEditing(false);
    if (!trimmed || trimmed === todo.title) return;
    setIsLoading(true);
    await onRename(todo.id, trimmed);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitEdit();
    if (e.key === "Escape") {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center gap-3 bg-white rounded-xl shadow-sm px-5 py-4 group">
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors disabled:opacity-50
          border-gray-300 hover:border-blue-400
          data-[done=true]:border-blue-500 data-[done=true]:bg-blue-500"
        data-done={todo.is_done}
        aria-label={todo.is_done ? "未完了に戻す" : "完了にする"}
      >
        {todo.is_done && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm text-gray-800 border-b border-blue-400 outline-none bg-transparent"
        />
      ) : (
        <span
          onDoubleClick={startEditing}
          title={todo.is_done ? undefined : "ダブルクリックで編集"}
          className={`flex-1 text-sm text-gray-800 transition-colors cursor-default select-none ${
            todo.is_done ? "line-through text-gray-400" : "hover:text-blue-600"
          }`}
        >
          {todo.title}
        </span>
      )}

      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="opacity-0 group-hover:opacity-100 flex-shrink-0 text-gray-400 hover:text-red-500 transition-all disabled:opacity-50"
        aria-label="削除"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import type { Todo } from "@/types/todo";

export default async function Home() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header email={user?.email} />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <TodoList initialTodos={(todos as Todo[]) ?? []} />
      </main>
    </div>
  );
}

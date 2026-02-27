import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Header from "@/components/Header";

export default async function Home() {
  const supabase = createClient(cookies());

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: todos, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header email={user?.email} />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <ul className="space-y-3">
          {todos?.map((todo) => (
            <li
              key={todo.id}
              className="bg-white rounded-xl shadow-sm px-5 py-4 text-gray-800"
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

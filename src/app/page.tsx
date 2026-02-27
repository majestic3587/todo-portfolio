import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error(error);
  }
  console.log(data);
  return (
    <div>
      {data?.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
        </div>
      ))}
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { UpdateTodoInput } from "@/types/todo";

type RouteContext = {
  params: { id: string };
};

// PATCH /api/todos/:id
export async function PATCH(request: Request, { params }: RouteContext) {
  const supabase = createClient(cookies());

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body: UpdateTodoInput = await request.json();
  if (Object.keys(body).length === 0) {
    return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
  }

  const updates: UpdateTodoInput & { updated_at: string } = {
    ...body,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}

// DELETE /api/todos/:id
export async function DELETE(_request: Request, { params }: RouteContext) {
  const supabase = createClient(cookies());

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const { error, count } = await supabase
    .from("todos")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (count === 0) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}

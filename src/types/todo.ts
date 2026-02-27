export type Todo = {
  id: number;
  user_id: string | null;
  title: string | null;
  is_done: boolean | null;
  created_at: string;
  updated_at: string | null;
};

export type CreateTodoInput = {
  title: string;
};

export type UpdateTodoInput = {
  title?: string;
  is_done?: boolean;
};

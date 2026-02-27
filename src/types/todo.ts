export type Todo = {
  id: number;
  user_id: string;
  title: string;
  is_done: boolean;
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

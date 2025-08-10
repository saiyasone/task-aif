export interface ITodo {
  id: string;
  todo: string;
  completed: boolean;
  userId: string;
}

export interface ITodoInput {
  id?: string;
  todo: string;
  userId: string;
  completed: boolean;
}

export interface TodoStateFilter {
  limit: number;
  page: number;

  search?: string;
  userId?: string;
  status?: string;
}

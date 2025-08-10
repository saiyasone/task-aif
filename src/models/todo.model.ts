export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface ITodoInput {
  id?: string;
  todo: string;
  userId: number;
  completed: boolean;
}

export interface TodoStateFilter {
  limit: number;
  page: number;

  search?: string;
  userId?: string;
  status?: string;
}

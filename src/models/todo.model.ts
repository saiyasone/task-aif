export interface ITodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface ITodoInput {
  todo: string;
  userId: number;
  completed: boolean;
}

import type { ITodo } from "../models/todo.model";

export const mockTodos: ITodo[] = [
  {
    id: 1,
    todo: "Learn React",
    completed: true,
    userId: 1,
  },
  {
    id: 2,
    todo: "Learn TypeScript",
    completed: false,
    userId: 2,
  },
  {
    id: 3,
    todo: "Learn JavaScript",
    completed: false,
    userId: 3,
  },
];

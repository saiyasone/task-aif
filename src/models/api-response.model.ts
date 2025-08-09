import type { ITodo } from "./todo.model";

export interface IApiTodoResponse {
  todos: ITodo[];
  total: number;
  skip: number;
  limit: number;
}

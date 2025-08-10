import axios from "axios";
import { API_ENDPOINT } from "@/main";
import type { IApiTodoResponse } from "@/models/api-response.model";
import type { ITodo, ITodoInput } from "@/models/todo.model";

export const todoApi = {
  async getAllTodos(url: string): Promise<IApiTodoResponse> {
    const response = await axios.get<IApiTodoResponse>(`${url}`);

    const data = await response.data;
    return data;
  },

  async createTodo(todoData: ITodoInput): Promise<ITodo> {
    const response = await axios.post(`${API_ENDPOINT}/todos/add`, todoData);

    return response.data;
  },

  async updateTodo(id: number, updates: ITodoInput): Promise<ITodo> {
    const response = await axios.put(`${API_ENDPOINT}/todos/${id}`, updates);

    return response.data;
  },

  async deleteTodo(id: number): Promise<{
    id: number;
  }> {
    const response = await axios.delete(`${API_ENDPOINT}/todos/${id}`, {});
    return response.data;
  },
};

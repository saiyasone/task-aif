import type { ITodo, TodoStateFilter } from "@/models/todo.model";
import { useEffect, useMemo, useState } from "react";

import { API_ENDPOINT } from "@/main";
import { todoApi } from "@/service/api";

type Prop = {
  filter: TodoStateFilter;
};
const useManageTodo = (props: Prop) => {
  const { limit, userId, search, status } = props.filter;

  const [isLoading, setIsLoading] = useState(true);
  const [todoItems, setTodoItems] = useState<ITodo[]>([]);
  const [total, setTotal] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isErrMsg, setIsErrMsg] = useState("");

  const handleOnFetchData = async () => {
    let url = "";
    if (!userId) {
      url = `${API_ENDPOINT}/todos?limit=${limit}`;
    } else {
      url = `${API_ENDPOINT}/todos/user/${userId}`;
    }

    try {
      setIsLoading(true);
      const resData = await todoApi.getAllTodos(url);

      setTotal(resData.total || 0);
      setTodoItems(resData.todos || []);
    } catch (error: any) {
      setIsErrMsg(error?.message || "Somthing went wrong");
      setIsError(true);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    handleOnFetchData();
  }, [limit, userId]);

  const data = useMemo(() => {
    if (todoItems && todoItems.length > 0) {
      let items: ITodo[] = [...todoItems];

      if (search) {
        items = items.filter((item) =>
          item.todo.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (status) {
        items = items.filter((item) =>
          status === "completed" ? item.completed : !item.completed
        );
      }

      return items;
    }

    return [];
  }, [todoItems, search, status]) as ITodo[];

  const total_remaining = useMemo(() => {
    if (data && data.length > 0) {
      if (total <= data.length) {
        return 0;
      }

      return total - data.length;
    }

    return total || 0;
  }, [data, total]);

  const total_status = useMemo(() => {
    if (data && data.length > 0) {
      const completed = data.filter((item) => item.completed).length;
      const pending = data.filter((item) => !item.completed).length;

      return {
        completed,
        pending,
      };
    }

    return {
      pending: 0,
      completed: 0,
    };
  }, [data]);

  return {
    data,
    total,
    total_remaining,
    total_status,

    isLoading,
    isError,
    isErrMsg,
  };
};

export default useManageTodo;

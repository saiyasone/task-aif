import type { TodoStateFilter } from "@/models/todo.model";
import { useMemo, useReducer } from "react";

const initialValues: TodoStateFilter = {
  limit: 10,
  page: 1,
  search: "",
  status: "",
  userId: "",
};

const ACTION_TYPE = {
  SET_SEARCH: "SET_SEARCH",
  SET_USER_ID: "SET_USER_ID",
  SET_STATUS: "SET_STATUS",
  SET_PAGE: "SET_PAGE",
  SET_LIMIT: "SET_LIMIT",
};

const reducer = (state: TodoStateFilter, action: any): TodoStateFilter => {
  switch (action.type) {
    case ACTION_TYPE.SET_SEARCH:
      return { ...state, search: action.payload };
    case ACTION_TYPE.SET_USER_ID:
      // console.log(action.payload);
      return { ...state, userId: String(action.payload) };
    case ACTION_TYPE.SET_STATUS:
      const payload = action.payload === "all" ? "" : action.payload;
      return { ...state, status: payload };
    case ACTION_TYPE.SET_LIMIT:
      return { ...state, limit: action.payload };
    default:
      return state;
  }
};

const useFilter = () => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const data = useMemo(() => {
    return {
      ...state,
    };
  }, [state]);

  return {
    data,
    action: ACTION_TYPE,

    dispatch,
  };
};

export default useFilter;

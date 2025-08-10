import type { TodoStateFilter } from "@/models/todo.model";

type Prop = {
  filter: TodoStateFilter;
};
const useManageTodo = (props: Prop) => {
  const {} = props.filter;

  return {
    data: [],
  };
};

import { Fragment, useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import type { ITodo } from "@/models/todo.model";
import DialogTodo from "./DialogTodo";
import useManageTodo from "@/hook/useManageTodo";
import useFilter from "@/hook/useFilter";
import TodoItemLoading from "./TodoItemLoading";
import ErrorNetworking from "./ErrorNetworking";
import useManageUser from "@/hook/useManageUser";

const TodoApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataForEvent, setDataForEvent] = useState<{
    data: ITodo | null;
    action: string;
  }>({ data: null, action: "" });

  const filter = useFilter();
  const manageUser = useManageUser();
  const manageTodo = useManageTodo({
    filter: filter.data,
  });

  const handleIsOpen = () => setIsOpen(!isOpen);

  const handleResetDataEvent = () => {
    setDataForEvent({
      data: null,
      action: "",
    });
  };

  const menuOnClick = (action: string) => {
    switch (action) {
      case "edit":
        handleIsOpen();
        break;
      case "delete":
        // Handle delete action
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (dataForEvent.action) {
      menuOnClick(dataForEvent.action);
    }
  }, [dataForEvent.action]);

  return (
    <Fragment>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 flex-col">
              <h1 className="text-3xl font-bold">AIF Task Management</h1>
              <p className="text-muted-foreground">
                {manageTodo.total} total • {manageTodo.total_status.completed}{" "}
                completed • {manageTodo.total_status.pending} pending
              </p>
            </div>

            <div>
              <Button onClick={handleIsOpen}>
                <Plus className="w-4 h-4 mr-2" />
                Add Todo
              </Button>
            </div>
          </div>

          <TodoFilter users={manageUser.data} filter={filter} />

          {manageTodo.isLoading && !manageTodo.data.length ? (
            <TodoItemLoading />
          ) : !manageTodo.isLoading && !manageTodo.data.length ? (
            <Fragment>
              <div className="flex justify-center">
                <h2 className="text-[1rem] md:text-xl font-normal">
                  No todos found ...
                </h2>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {manageTodo.data.map((todo, index) => (
                <TodoItem
                  key={index}
                  todo={todo}
                  onClick={(action: string) => {
                    setDataForEvent({
                      action,
                      data: todo,
                    });
                  }}
                />
              ))}

              {!manageTodo.isError &&
                manageTodo.data.length !== manageTodo.total && (
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        filter.dispatch({
                          type: filter.action.SET_LIMIT,
                          payload: filter.data.limit + 10,
                        });
                      }}
                      variant={"outline"}
                      type="button"
                      className="cursor-pointer"
                      disabled={manageTodo.isLoading}
                    >
                      {manageTodo.isLoading ? "Loading ..." : "Load More"}
                    </Button>
                  </div>
                )}
            </Fragment>
          )}
        </div>
      </div>

      {manageTodo.isError && <ErrorNetworking message={manageTodo.isErrMsg} />}

      <DialogTodo
        users={manageUser.data}
        isOpen={isOpen}
        onClose={() => {
          handleIsOpen();
          handleResetDataEvent();
        }}
        todo={dataForEvent.data!}
      />
    </Fragment>
  );
};

export default TodoApp;

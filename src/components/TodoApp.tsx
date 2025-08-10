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
import { toast } from "sonner";
import { todoApi } from "@/service/api";

const TodoApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTodo, setIsTodo] = useState(false);
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

  const handleOnUpdateFilter = async (todo: ITodo) => {
    setIsTodo(true);
    const item: ITodo = {
      completed: !todo!.completed,
      id: String(todo!.id),
      todo: todo!.todo,
      userId: todo!.userId,
    };

    try {
      await todoApi.updateTodo(todo?.id || "", item!);

      toast.success("Todo updated");
      manageTodo.handleOnChangeData(item);
    } catch (error: any) {
      toast.error(error?.message || "Failed to update todo");
    } finally {
      handleResetDataEvent();
      setIsTodo(false);
    }
  };

  const menuOnClick = (data: ITodo, action: string) => {
    switch (action) {
      case "edit":
        handleIsOpen();
        break;
      case "filter":
        handleOnUpdateFilter(data);
        break;
      case "delete":
        manageTodo.handleOnDelete(dataForEvent.data!.id, (message, isErr) => {
          if (isErr) {
            toast.error(message);
          } else {
            toast.success(message);
          }
        });

        handleResetDataEvent();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (dataForEvent.action && dataForEvent.data) {
      menuOnClick(dataForEvent.data, dataForEvent.action);
    }
  }, [dataForEvent.action, dataForEvent.data]);

  return (
    <Fragment>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex gap-2 flex-col">
              <h1 className="text-3xl font-bold">AIF Task Management</h1>
              <div className="flex gap-2 flex-wrap items-center">
                <p className="text-muted-foreground">
                  {manageTodo.total_status.total_update} total •{" "}
                </p>
                <p className="text-muted-foreground">
                  {manageTodo.total_status.completed} completed •{" "}
                </p>
                <p className="text-muted-foreground">
                  {manageTodo.total_status.pending} pending
                </p>
              </div>
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
                  isLoading={isTodo}
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
        onSuccess={(todo, val) => {
          handleIsOpen();
          handleResetDataEvent();

          if (val) {
            manageTodo.handleOnChangeData(todo);
          } else {
            manageTodo.handleOnSaveData(todo);
          }
        }}
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

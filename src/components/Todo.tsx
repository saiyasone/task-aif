import { Fragment, useEffect, useState } from "react";
import { mockTodos } from "../data/mock-data";
import TodoItem from "./TodoItem";
import TodoFilter from "./TodoFilter";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import type { ITodo } from "@/models/todo.model";
import DialogTodo from "./DialogTodo";
import TodoItemLoading from "./TodoItemLoading";

function Todo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [dataForEvent, setDataForEvent] = useState<{
    data: ITodo | null;
    action: string;
  }>({ data: null, action: "" });

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
      console.log(dataForEvent);
      menuOnClick(dataForEvent.action);
    }
  }, [dataForEvent.action]);

  return (
    <Fragment>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2 flex-col">
            <h1 className="text-3xl font-bold">Todo Manager</h1>
            <p className="text-muted-foreground">
              {0} total • {0} completed • {0 - 0} pending
            </p>
          </div>

          <div>
            <Button onClick={handleIsOpen}>
              <Plus className="w-4 h-4 mr-2" />
              Add Todo
            </Button>
          </div>
        </div>

        <TodoFilter />

        {mockTodos.map((todo, index) => (
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

        <div className="flex justify-center">
          <Button
            onClick={() => {
              setIsLoadMore(true);
              setTimeout(() => {
                setIsLoadMore(false);
              }, 1000);
            }}
            variant={"outline"}
            className="cursor-pointer"
            disabled={isLoadMore}
          >
            {isLoadMore ? "Loading ..." : <>Load More ({"244 remainings"}) </>}
          </Button>
        </div>
      </div>

      <DialogTodo
        isOpen={isOpen}
        onClose={() => {
          handleIsOpen();
          handleResetDataEvent();
        }}
        todo={dataForEvent.data!}
      />
    </Fragment>
  );
}

export default Todo;

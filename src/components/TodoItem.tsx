import { Fragment } from "react";
import type { ITodo } from "../models/todo.model";
import { Check, Clock, Edit2, Trash2, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

type Prop = {
  todo: ITodo;
  isLoading?: boolean;
  onClick?: (action: string) => void;
};
function TodoItem(props: Prop) {
  const { todo, isLoading } = props;

  const menuOnClick = (action: string) => {
    props.onClick?.(action);
  };

  return (
    <Card className={`transition-all ${todo.completed ? "opacity-75" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              id={`filter-${todo.id}`}
              checked={todo.completed}
              disabled={isLoading || false}
              onCheckedChange={() => {
                menuOnClick("filter");
              }}
              className="mt-1 cursor-pointer"
            />

            <div className="flex-1 space-y-2">
              <Fragment>
                <label
                  htmlFor={`filter-${todo.id}`}
                  className={`cursor-pointer text-sm leading-relaxed block ${
                    todo.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {todo.todo}
                </label>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={"secondary"}
                    className={`text-xs text-white py-1.5 px-3 ${
                      todo.completed ? "bg-green-600" : "bg-amber-600"
                    }`}
                  >
                    {todo.completed ? (
                      <>
                        <Check className="w-3 h-3 mr-1" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <User className="w-3 h-3 mr-1" />
                    User {todo.userId}
                  </Badge>
                </div>
              </Fragment>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                menuOnClick("edit");
              }}
              disabled={false}
              className="cursor-pointer"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                menuOnClick("delete");
              }}
              disabled={false}
              className="cursor-pointer text-red-500 hover:text-white hover:bg-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TodoItem;

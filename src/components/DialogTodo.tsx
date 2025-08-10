import type { ITodo, ITodoInput } from "@/models/todo.model";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import * as yup from "yup";
import { Formik, type FormikProps } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import type { IUser } from "@/models/user.model";
import { toast } from "sonner";
import { todoApi } from "@/service/api";

interface InputValues {
  id?: string;
  todo: string;
  userId: string;
  completed: boolean;
}

type Props = {
  isOpen: boolean;
  users: IUser[];

  todo?: ITodo;

  onSuccess?: (todo: ITodoInput, isUpdate: boolean) => void;
  onClose: () => void;
};
function DialogTodo(props: Props) {
  const { isOpen, onClose, todo } = props;
  const formikRef = React.useRef<FormikProps<InputValues>>(null);
  const [dataForEvent, setDataForEvent] = useState<InputValues | null>({
    completed: false,
    id: "",
    todo: "",
    userId: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnClose = () => {
    setDataForEvent({
      completed: false,
      id: "",
      todo: "",
      userId: "",
    });
    setIsUpdate(false);
    onClose();
  };

  const handleOnSubmitForm = async (values: InputValues) => {
    setIsLoading(true);

    const input: ITodoInput = {
      ...values,
      id: dataForEvent?.id || "",
    };

    try {
      let newTodo: ITodoInput = {
        completed: false,
        id: "",
        todo: "",
        userId: "",
      };
      if (isUpdate) {
        const response = await todoApi.updateTodo(
          dataForEvent?.id || "",
          input
        );
        newTodo = { ...response };
        props.onSuccess?.(newTodo, true);
      } else {
        const response = await todoApi.createTodo(input);
        newTodo = { ...response };
        props.onSuccess?.(newTodo, false);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
      if (isUpdate) {
        toast.success("Todo was changes");
      } else {
        toast.success("Todo created");
      }
    }
  };

  useEffect(() => {
    if (todo && isOpen) {
      setIsUpdate(true);
      setDataForEvent({
        completed: todo.completed,
        id: todo.id.toString(),
        todo: todo.todo,
        userId: todo.userId.toString(),
      });
    }
  }, [todo, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? () => {} : handleOnClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Update Todo" : "Add New Todo"}</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={dataForEvent!}
          validationSchema={yup.object({
            todo: yup.string().required("Title is required"),
            userId: yup.number().min(1).required("User ID is required"),
            completed: yup.boolean(),
          })}
          innerRef={formikRef}
          onSubmit={handleOnSubmitForm}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2" htmlFor="todo-text">
                    Title
                  </Label>
                  <Input
                    id="todo-text"
                    name="todo"
                    placeholder="Enter todo description..."
                    value={values?.todo || ""}
                    onChange={handleChange}
                    className={cn(
                      touched.todo && errors.todo
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    )}
                  />

                  {touched.todo && errors.todo && (
                    <p className="text-sm text-red-500">{errors.todo}</p>
                  )}
                </div>

                <div className="w-full">
                  <Label className="mb-2" htmlFor="todo-text">
                    Select user
                  </Label>
                  <Select
                    value={values.userId}
                    name="userId"
                    onValueChange={(data) => {
                      setFieldValue("userId", data);
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        touched.userId && errors.userId
                          ? "w-full border-red-500 focus-visible:ring-red-500"
                          : "w-full"
                      )}
                    >
                      <SelectValue placeholder="select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {props.users.map((user, index) => (
                        <SelectItem key={index} value={user.id.toString()}>
                          User {user.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {touched.userId && errors.userId && (
                    <p className="text-sm text-red-500">{errors.userId}</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="completed"
                    name="completed"
                    checked={values?.completed || false}
                    onCheckedChange={(checked) => {
                      setFieldValue("completed", checked);
                    }}
                    className="cursor-pointer"
                  />
                  <Label className="cursor-pointer" htmlFor="completed">
                    Mark as completed
                  </Label>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => (isLoading ? null : handleOnClose())}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Processing ..."
                      : todo
                      ? "Save changes"
                      : "Add todo"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default DialogTodo;

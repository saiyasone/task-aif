import React from "react";
import { Card, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function TodoItemLoading() {
  return (
    <React.Fragment>
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Skeleton  className="w-[30px] h-[30px] rounded-full" />
              <Skeleton className="w-[200px] sm:w-[400px] h-4 rounded-sm" />
            </div>

            <div className="flex items-center gap-3">
              <Skeleton className="w-[60px] sm:w-[100px] h-4 rounded-sm" />
              <Skeleton className="w-[60px] sm:w-[100px] h-4 rounded-sm" />
            </div>
          </CardHeader>
        </Card>
      ))}
    </React.Fragment>
  );
}

export default TodoItemLoading;

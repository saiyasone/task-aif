import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Filter, Search, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { TodoStatusItems } from "@/constants/menuItems";
import useFilter from "@/hook/useFilter";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { IUser } from "@/models/user.model";

type Prop = {
  users: IUser[];
  filter: ReturnType<typeof useFilter>;
};
function TodoFilter({ users, filter }: Prop) {
  const { search, status, userId } = filter.data;

  const handleClearFilters = () => {
    filter.dispatch({
      type: filter.action.SET_SEARCH,
      payload: "",
    });
    filter.dispatch({
      type: filter.action.SET_STATUS,
      payload: "",
    });
    filter.dispatch({
      type: filter.action.SET_USER_ID,
      payload: "",
    });
  };

  const isDisabled = useMemo(() => {
    if (!search && !status && !userId) return true;

    return false;
  }, [search, status, userId]);
  return (
    <React.Fragment>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>Filters & Search</span>
            </div>

            {!isDisabled && (
              <Button
                onClick={handleClearFilters}
                variant={"outline"}
                className="cursor-pointer"
              >
                <X />
                Clear filters
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search todos..."
                value={search || ""}
                onChange={(e) => {
                  filter.dispatch({
                    type: filter.action.SET_SEARCH,
                    payload: e.target.value,
                  });
                }}
                className="pl-10"
              />
            </div>

            <Select
              value={status || "all"}
              onValueChange={(value: "all" | "completed" | "pending") => {
                filter.dispatch({
                  type: filter.action.SET_STATUS,
                  payload: value,
                });
              }}
            >
              <SelectTrigger className={`w-full md:w-[150px]`}>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {TodoStatusItems.map((item, index) => (
                  <SelectItem key={index} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={userId || ""}
              onValueChange={(value: string) => {
                filter.dispatch({
                  type: filter.action.SET_USER_ID,
                  payload: value === "all" ? "" : value,
                });
              }}
            >
              <SelectTrigger className={`w-full md:w-[150px]`}>
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {users.map((user, index) => (
                  <SelectItem key={index} value={user.id.toString()}>
                    User - ({user.id})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>

        <CardContent>
          <div className="flex gap-3 flex-col sm:flex-row items-start sm:items-center">
            {!isDisabled && (
              <span className="text-sm font-bold">Active filters:</span>
            )}
            <div className="flex gap-2 items-center flex-wrap">
              {search && (
                <Badge variant={"secondary"}>
                  <div className="flex gap-2">
                    <span>Search: {search}</span>
                    <span
                      onClick={() => {
                        filter.dispatch({
                          type: filter.action.SET_SEARCH,
                          payload: "",
                        });
                      }}
                      className="cursor-pointer text-gray-500"
                    >
                      <X className="w-4 h-4" />
                    </span>
                  </div>
                </Badge>
              )}

              {status && (
                <Badge variant={"secondary"}>
                  <div className="flex gap-2">
                    <span>Status: {status}</span>
                    <span
                      onClick={() => {
                        filter.dispatch({
                          type: filter.action.SET_STATUS,
                          payload: "",
                        });
                      }}
                      className="cursor-pointer text-gray-500"
                    >
                      <X className="w-4 h-4" />
                    </span>
                  </div>
                </Badge>
              )}
              {userId && (
                <Badge variant={"secondary"}>
                  <div className="flex gap-2">
                    <span>User: {userId}</span>
                    <span
                      onClick={() => {
                        filter.dispatch({
                          type: filter.action.SET_USER_ID,
                          payload: "",
                        });
                      }}
                      className="cursor-pointer text-gray-500"
                    >
                      <X className="w-4 h-4" />
                    </span>
                  </div>
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default TodoFilter;

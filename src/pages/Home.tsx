import TodoApp from "@/components/TodoApp";
import { createRoute } from "@tanstack/react-router";
import React from "react";
import { rootRoute } from "./route";

function Home() {
  return (
    <React.Fragment>
      <TodoApp />
    </React.Fragment>
  );
}

export default Home;

export const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <Home />,
});

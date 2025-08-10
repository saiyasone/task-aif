import React from "react";
import TodoApp from "./components/TodoApp";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <React.Fragment>
      <TodoApp />

      <Toaster position="top-right" />
    </React.Fragment>
  );
}

export default App;

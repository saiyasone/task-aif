import React from "react";
import Todo from "./components/Todo";

function App() {
  return (
    <React.Fragment>
      <div className="container mx-auto p-6 max-w-4xl">
        <Todo />
      </div>
    </React.Fragment>
  );
}

export default App;

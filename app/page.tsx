import { Suspense } from "react";
import TodoFilter from "./components/Todo/TodoFilter";
import TodoList from "./components/Todo/TodoList";

// to-do list
export default function ToDoList() {
  return (
    <Suspense fallback={<TodoFilter loading={true} />}>
      {typeof window !== "undefined" && (
        <>
          <TodoFilter />
          <TodoList />
        </>
      )}
    </Suspense>
  );
}

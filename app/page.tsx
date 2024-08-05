"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const TodoFilter = dynamic(() => import('./components/Todo/TodoFilter'), { ssr: false });
const TodoList = dynamic(() => import('./components/Todo/TodoList'), { ssr: false });

// to-do list
export default function ToDoList() {
  return (
    <Suspense fallback={<TodoFilter loading={true} />}>
      <>
        <TodoFilter />
        <TodoList />
      </>
    </Suspense>
  );
}

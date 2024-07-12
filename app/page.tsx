import { Suspense } from "react";
import TodoFilter from "./components/Todo/TodoFilter";
import TodoList from "./components/Todo/TodoList";
import styles from "./components/Todo/Todo.module.css";

// to-do list
export default function ToDoList() {
  return (
    <>
      <Suspense fallback={<TodoFilter loading={true} />}>
        <TodoFilter />
      </Suspense>
      <Suspense
        fallback={
          <ul className={styles.list__wrap}>
            <li>등록된 할 일이 없습니다.</li>
          </ul>
        }
      >
        <TodoList />
      </Suspense>
    </>
  );
}

import TodoFilter from "./(_to_do_list)/TodoFilter";
import TodoList from "./(_to_do_list)/TodoList";
import styles from "./page.module.css";

// to-do list
export default function ToDoList() {
  return (
    <>
      <TodoFilter />
      <TodoList />
    </>
  );
}

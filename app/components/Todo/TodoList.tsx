"use client";

import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from "./Todo.module.css";
import { updateStorage } from '@/app/utils/LocalStorage';
import { TodoListDataProps } from '@/app/interfaces/TodoProps';
import { TodoReadDesc } from '@/app/utils/TodoUtils';

const TodoList = () => {
  const TodoData: TodoListDataProps | null = TodoReadDesc();
  const [todoData, setTodoData] = useState<TodoListDataProps | null>(TodoData);
  const [reload, setReload] = useState(false);

  // read 할 때 정렬해서 보내준거여서 utils 분리 안함. 분리하면 정렬 과정이 또..
  // update
  const handelUpdateTodo = (date: string, key: number) => {
    if (!todoData || !date || !key) return false

    const updateData: TodoListDataProps = {
      ...todoData,
      [date]: {
        ...todoData[date],
        [key]: {
          ...todoData[date][key],
          state: todoData[date][key].state === "not" ? "done" : "not"
        }
      }
    }

    setTodoData(updateData)
    updateStorage("todo_list", updateData)
  }
  // delete
  const handelDeleteTodo = (date: string, key: number) => {
    if (!todoData || !date || key === undefined) return false

    const updateData: TodoListDataProps = todoData;

    // 해당 날짜에 todo 1개면 날짜도 삭제
    if (Object.keys(updateData[date]).length <= 1) {
      delete updateData[date];
    } else {
      delete updateData[date][key];
    }

    setTodoData(updateData)
    updateStorage("todo_list", updateData)

    // delete 때문에 변화 감지를 못해서 강제 재 랜더링
    setReload(true);
  }

  useEffect(() => {
    reload && setReload(false);
  }, [todoData, reload]);

  return (
    <ul className={styles.list__wrap}>
      {!todoData || Object.keys(todoData).length === 0 ? (
        <li>등록된 할 일이 없습니다.</li>
      ) : (
        Object.keys(todoData).map((dateKey) => (
          Object.entries(todoData[dateKey]).map(([key, item]) => (
            <li className={styles.list__item} key={key}>
              <input
                type="checkbox"
                name={`${dateKey}_${key}`}
                id={`${dateKey}_${key}`}
                defaultChecked={item.state === "done"}
              />
              <label
                htmlFor={`${dateKey}_${key}`}
                className={item.state === "done" ? styles.checked : ''}
                onClick={() => handelUpdateTodo(dateKey, Number(key))}
              >
                {item.detail}
              </label>
              <button onClick={() => handelDeleteTodo(dateKey, Number(key))}><DeleteOutlined /></button>
            </li>
          ))
        ))
      )}
    </ul>
  );
}

export default TodoList;

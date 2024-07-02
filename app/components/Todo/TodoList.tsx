"use client";

import { DeleteOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from "./Todo.module.css";
import { updateStorage } from '@/app/utils/LocalStorage';
import { TodoListDataProps } from '@/app/interfaces/TodoProps';
import { TodoReadDesc, deleteTodo } from '@/app/utils/TodoUtils';
import { useRenderingStore } from '../store/useRenderingStore';
import { useModalStore } from '../store/useModalStore';
import { useSearchParams } from 'next/navigation';

const TodoList = () => {
  const params = useSearchParams();
  const type = params.get("type") || "";
  const { reload, setReload } = useRenderingStore();
  const { modalOpen } = useModalStore();

  const TodoData: TodoListDataProps | null = TodoReadDesc(type);

  // update
  const handelUpdateTodo = (date: string, key: number) => {
    if (!TodoData || !date || !key) return false

    const updateData: TodoListDataProps = {
      ...TodoData,
      [date]: {
        ...TodoData[date],
        [key]: {
          ...TodoData[date][key],
          state: TodoData[date][key].state === "not" ? "done" : "not"
        }
      }
    }

    updateStorage("todo_list", updateData);
    setReload(true);
  }
  // delete
  const handelDeleteTodo = (date: string, key: number) => {
    if (!TodoData || !date || key === undefined) return false

    deleteTodo(date, key);
    // 재 랜더링
    setReload(true);
  }

  useEffect(() => {
    reload && setReload(false);
  }, [reload, modalOpen]);

  return (
    <ul className={styles.list__wrap}>
      {!TodoData || Object.keys(TodoData).length === 0 ? (
        <li>등록된 할 일이 없습니다.</li>
      ) : (
        Object.keys(TodoData).map((dateKey) => (
          Object.entries(TodoData[dateKey]).map(([key, item]) => (
            <li className={styles.list__item} key={key}>
              <input
                type="checkbox"
                name={`${dateKey}_${key}`}
                id={`${dateKey}_${key}`}
                defaultChecked={item.state === "done"}
                onChange={() => handelUpdateTodo(dateKey, Number(key))}
              />
              <label
                htmlFor={`${dateKey}_${key}`}
                className={item.state === "done" ? styles.checked : ''}
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

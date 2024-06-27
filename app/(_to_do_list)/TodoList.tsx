import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import styles from "./Todo.module.css";

const TodoList = () => {
  return (
    <ul className={styles.list__wrap}>
      <li className={styles.list__item}>
        <input type="checkbox" name="check" id="check" />
        <label htmlFor="check">to do something</label>
        <button><DeleteOutlined /></button>
      </li>
      <li className={styles.list__item}>
        <input type="checkbox" name="check" id="" />
        <label className={styles.checked} htmlFor="check">to do something</label>
        <button><DeleteOutlined /></button>
      </li>
    </ul>
  );
}

export default TodoList;

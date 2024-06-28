"use client";

import React, { useState } from 'react';
import styles from "./Modal.module.css";
import { Button, Input } from 'antd';
import { createTodoMulti } from '@/app/utils/TodoUtils';

const AddTodoMultiModal = () => {
  const [textValue, setTextValue] = useState("#");

  const handelCreateTodo = () => {
    createTodoMulti(textValue);
    setTextValue("#");
  }

  return (
    <div className={styles.modal__wrap}>
      <h3 className={styles.modal__title}>To-do lists 추가</h3>

      <Input.TextArea
        className={styles.modal__textarea}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />

      <p className={styles.text__small}>
        <span className={styles.text__red}>#</span> 입력 후 작성한 글은 하나의 To-do로 구분됩니다.
      </p>

      <Button type="primary" onClick={() => handelCreateTodo()} block>
        추가
      </Button>
    </div>
  );
}

export default AddTodoMultiModal;

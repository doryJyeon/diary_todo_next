"use client";

import React, { useState } from 'react';
import styles from "./Modal.module.css";
import { Button, Input, Space } from 'antd';
import { createTodo } from '@/app/utils/TodoUtils';
import { handleEnterKeyDown } from '@/app/utils/EnterKeyUtils';

const AddTodoModal = () => {
  const [inputText, setInputText] = useState("");

  const handelCreateTodo = () => {
    createTodo(inputText);
    setInputText("");
    // 임시 새로고침, 상태 관리 추가 후 변경 필요
    window.location.reload();
  }

  return (
    <div className={styles.modal__wrap}>
      <h3 className={styles.modal__title}>To-do list 추가</h3>

      <Space.Compact style={{ width: '100%' }}>
        <Input
          placeholder='to-do...'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => handleEnterKeyDown(e, handelCreateTodo)}
        />
        <Button type="primary" onClick={() => handelCreateTodo()}>추가</Button>
      </Space.Compact>

    </div>
  );
}

export default AddTodoModal;

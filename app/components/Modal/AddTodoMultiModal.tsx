"use client";

import React, { useState } from 'react';
import styles from "./Modal.module.css";
import { Button, Input } from 'antd';
import { createTodoMulti } from '@/app/utils/TodoUtils';
import { handleEnterKeyUp } from '@/app/utils/EnterKeyUtils';
import { useModalStore } from '../store/useModalStore';

interface Props {
  modalTitle: string,
  addDay?: number
}

const AddTodoMultiModal: React.FC<Props> = ({ modalTitle, addDay }) => {
  const { setModalClose } = useModalStore();

  const [textValue, setTextValue] = useState("#");

  const handelCreateTodo = () => {
    createTodoMulti(textValue, addDay);
    setTextValue("#");
    setModalClose();
  }

  // 엔터 키 입력 시 # 추가해주는 함수
  const handelEnterAdd = () => {
    setTextValue(textValue + "#");
  }

  return (
    <div className={styles.modal__wrap}>
      <h3 className={styles.modal__title}>{modalTitle}</h3>

      <Input.TextArea
        className={styles.modal__textarea}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onKeyUp={(e) => handleEnterKeyUp(e, handelEnterAdd)}
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

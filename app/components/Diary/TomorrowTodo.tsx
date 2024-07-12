"use client";

import React, { useEffect } from 'react';
import styles from "./../../diary/page.module.css";
import { CloseSquareOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import AddTodoMultiModal from '../Modal/AddTodoMultiModal';
import { useModalStore } from '../store/useModalStore';
import { TomorrowTodoRead, deleteTodo } from '@/app/utils/TodoUtils';
import { getFullDate } from '@/app/utils/DateUtils';
import { useRenderingStore } from '../store/useRenderingStore';

const TomorrowTodo = () => {
  const { reload, setReload } = useRenderingStore();
  const { modalOpen, setModalOpen, setModalClose } = useModalStore();
  const tomorrowTodoList = TomorrowTodoRead();

  useEffect(() => {
    typeof window !== 'undefined' && reload && setReload(false)
  }, [modalOpen, reload, setReload]);

  // 내일 할 일 to-do 삭제
  const handelDelTomorrowTodo = (todoId: string) => {
    const tomorrow = getFullDate(1);
    deleteTodo(tomorrow, Number(todoId));
    // 삭제 후 랜더링
    setReload(true);
  }

  return (
    <div className={styles.diary__tomorrow}>
      <div className={styles.diary__tomorrow__title}>
        <p>내일 할 일 <FormOutlined onClick={() => setModalOpen()} /></p>
      </div>

      <Modal
        open={modalOpen}
        onCancel={() => setModalClose()}
        footer={null}
        key={"tomorrow"}
      >
        <AddTodoMultiModal modalTitle={'내일 할 일'} addDay={1} />

        <div className="modal__cancel">
          <Button onClick={() => setModalClose()}>취소</Button>
        </div>
      </Modal>

      <ul className={styles.diary__todo}>
        {/* 아이콘 클릭하면 id 맞는거 찾아서 삭제 */}
        {Object.entries(tomorrowTodoList).map(([key, item]) => (
          <li key={key}>
            <CloseSquareOutlined onClick={() => { handelDelTomorrowTodo(key) }} /> {item.detail}
          </li>
        ))}

        <p className={styles.small}>내일 할 일은 현재 일자의 다음날로 추가됩니다!</p>
      </ul>
    </div>
  );
}

export default TomorrowTodo;

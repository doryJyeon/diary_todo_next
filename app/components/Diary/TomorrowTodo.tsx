"use client";

import React, { useEffect, useState } from 'react';
import styles from "./../../diary/page.module.css";
import { CloseSquareOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import AddTodoMultiModal from '../Modal/AddTodoMultiModal';
import { useModalStore } from '../store/useModalStore';

const TomorrowTodo = () => {
  const { modalOpen, setModalOpen, setModalClose } = useModalStore();
  const [tomorrow, setTomorrow] = useState([]);

  useEffect(() => {

  }, [modalOpen]);

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
        {tomorrow.map(value => (
          <li><CloseSquareOutlined />{value}</li>
        ))}

        <p className={styles.small}>내일 할 일은 현재 일자의 다음날로 추가됩니다!</p>
      </ul>
    </div>
  );
}

export default TomorrowTodo;

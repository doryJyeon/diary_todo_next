"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from "./SideMenu.module.css";
import { BookOutlined, CalendarOutlined, DeleteOutlined, EditOutlined, FileAddOutlined, FileDoneOutlined, FormOutlined } from '@ant-design/icons';
import { ButtonAction, SideMenuItemProps } from '../interfaces/SideMenuProps';
import { Button, Modal, Popconfirm, PopconfirmProps } from 'antd';
import AddTodoModal from '../components/Modal/AddTodoModal';
import AddTodoMultiModal from '../components/Modal/AddTodoMultiModal';
import { useModalStore } from '../components/store/useModalStore';
import { SideMenuActions } from '../utils/SideMenuBtnAction';
import { useDiaryStore } from '../components/store/useDiaryStore';
import { useRouter } from 'next/navigation';

const icons = {
  "pencil": <EditOutlined />,
  "pencilNote": <FormOutlined />,
  "saveFile": <FileAddOutlined />,
  "calendar": <CalendarOutlined />,
  "trash": <DeleteOutlined />,
  "book": <BookOutlined />,
  "note": <FileDoneOutlined />
}

const modals = {
  "addTodo": <AddTodoModal />,
  "addTodoMulti": <AddTodoMultiModal modalTitle={'To-do list 추가'} />
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  title, link, icon, color, modal, buttonAction
}) => {
  const router = useRouter();
  const { date, weather, feeling, content } = useDiaryStore();
  const { modalOpen, setModalOpen, setModalClose } = useModalStore();
  const itemColor = styles[color];

  const handelButtonClick = (action: ButtonAction) => {
    // 수정 페이지 이동
    if (action === "moveUpdateDiary") return router.push(`/diary/update/${date}`);

    // 저장, 삭제 시 데이터 변경
    const diaryData = {
      date: date,
      weather: weather,
      feeling: feeling,
      content: content
    }

    const result = SideMenuActions(diaryData, action);

    if (result === "success") {
      // router 이동
      (action === "addDiary" || action === "updateDiary") && router.push(`/diary/${date}`);
      action === "delDiary" && router.push(`/diary`);
    }
  }

  useEffect(() => {

  }, [date, weather, feeling, content]);

  if (link === "modal" && modal) {
    return (
      <>
        <button onClick={() => setModalOpen()} className={[styles.menu__item, itemColor].join(' ')} >
          <span className={styles.item__text}>
            {icons[icon]}<br />{title}
          </span>
        </button>

        <Modal
          open={modalOpen}
          onCancel={() => setModalClose()}
          footer={null}
          key={title}
        >
          {modals[modal!]}

          <div className="modal__cancel">
            <Button onClick={() => setModalClose()}>취소</Button>
          </div>
        </Modal>
      </>
    )
  } else if (link === "button" && buttonAction) {
    return (
      <>
        {buttonAction === "delDiary" ? (
          <Popconfirm
            title="해당 일기를 삭제하시겠습니까?"
            onConfirm={() => handelButtonClick(buttonAction)}
            okText="Yes"
            cancelText="No"
          >
            <button className={[styles.menu__item, itemColor].join(' ')} key={title}>
              <span className={styles.item__text}>
                {icons[icon]}<br />{title}
              </span>
            </button>
          </Popconfirm>
        ) : (
          <button onClick={() => handelButtonClick(buttonAction)} className={[styles.menu__item, itemColor].join(' ')} key={title}>
            <span className={styles.item__text}>
              {icons[icon]}<br />{title}
            </span>
          </button>
        )}
      </>
    )
  } else {
    return (
      <Link className={[styles.menu__item, itemColor].join(' ')} href={link} key={title}>
        <span className={styles.item__text}>
          {icons[icon]}<br />{title}
        </span>
      </Link>
    )
  }
}

export default SideMenuItem;

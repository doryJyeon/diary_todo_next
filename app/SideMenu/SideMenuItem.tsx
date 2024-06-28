"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styles from "./SideMenu.module.css";
import { BookOutlined, CalendarOutlined, DeleteOutlined, FileDoneOutlined, FormOutlined } from '@ant-design/icons';
import { SideMenuItemProps } from '../interfaces/SideMenuProps';
import { Button, Modal } from 'antd';
import AddTodoModal from '../components/Modal/AddTodoModal';
import DelDiaryModal from '../components/Modal/DelDiaryModal';
import AddTodoMultiModal from '../components/Modal/AddTodoMultiModal';

const icons = {
  "pencil": <FormOutlined />,
  "calendar": <CalendarOutlined />,
  "trash": <DeleteOutlined />,
  "book": <BookOutlined />,
  "note": <FileDoneOutlined />
}

const modals = {
  "addTodo": <AddTodoModal />,
  "addTodoMulti": <AddTodoMultiModal />,
  "delDiary": <DelDiaryModal />
}

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  title, link, icon, color, modal
}) => {
  const [open, setOpen] = useState(false);
  const itemColor = styles[color];

  if (link === "modal" && modal) {
    return (
      <>
        <button onClick={() => setOpen(true)} className={[styles.menu__item, itemColor].join(' ')} >
          <span className={styles.item__text}>
            {icons[icon]}<br />{title}
          </span>
        </button>

        <Modal
          open={open}
          onCancel={() => setOpen(false)}
          footer={null}
          key={title}
        >
          {modals[modal!]}

          <div className={styles.modal__cancel}>
            <Button>취소</Button>
          </div>
        </Modal>
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

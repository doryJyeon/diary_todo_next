"use client";

import React, { useEffect } from 'react';
import styles from "./../../diary/page.module.css";
import Input from 'antd/es/input';
import { useDiaryStore } from '../store/useDiaryStore';
import { DiaryDataResetReadId } from '@/app/utils/DiaryUtils';
import { DiaryOneProps } from '@/app/interfaces/DiaryProps';

// Id 있으면 read, 없으면 create 상태임
interface Props {
  id?: string
  isUpdate?: boolean
}

const DiaryContent: React.FC<Props> = ({ id, isUpdate }) => {
  const { content, setContent } = useDiaryStore();
  const isRead = (id && isUpdate === undefined) ? true : false;

  // id로 일기 조회 후 zustand 데이터 변경
  useEffect(() => {
    // store 데이터 변경
    if (id) {
      const readStore: DiaryOneProps = DiaryDataResetReadId(id);
      setContent(readStore.content);
    } else {
      setContent("");
    }
  }, [id]);

  const handelChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    !isRead && setContent(e.target.value)
  }

  return (
    <div className={styles.diary__content}>
      <Input.TextArea
        variant={"borderless"}
        value={content}
        onChange={(e) => handelChangeContent(e)}
        readOnly={isRead}
        autoSize={{ minRows: 12 }}
        maxLength={30000}
      />
    </div>
  );
}

export default DiaryContent;

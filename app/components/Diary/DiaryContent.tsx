"use client";

import React, { useEffect } from 'react';
import styles from "./../../diary/page.module.css";
import Input from 'antd/es/input';
import { useDiaryStore } from '../store/useDiaryStore';
import { DiaryDataResetReadId } from '@/app/utils/DiaryUtils';

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
    // 리셋
    DiaryDataResetReadId(id);
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
      />
    </div>
  );
}

export default DiaryContent;

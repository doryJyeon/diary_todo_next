"use client";

import React from 'react';
import Link from 'next/link';
import type { CalendarProps } from 'antd';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';
import { DiaryListRead } from '@/app/utils/DiaryUtils';
import { iconsFeeling } from './DiaryIcons';
import styles from "./../../diary/page.module.css";

const DiaryList: React.FC = () => {
  const diaryList = DiaryListRead();

  const dateCellRender = (value: Dayjs) => {
    if (diaryList) {
      const dateString = value.format('YYYYMMDD');
      const iconData = iconsFeeling[diaryList[dateString]];

      return (
        <Link href={`/diary/${dateString}`} key={dateString} className={styles.calendar__icon}>
          {iconData}
        </Link>
      );
    } else {
      return null
    }
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current) => {
    return dateCellRender(current);
  };

  return <Calendar cellRender={cellRender} />;
};

export default DiaryList;
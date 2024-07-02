"use client";

import React, { useEffect } from 'react';
import styles from "./../../diary/page.module.css";
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useDiaryStore } from '../store/useDiaryStore';
import { DiaryDataResetReadId } from '@/app/utils/DiaryUtils';
import { fullDateFormat } from '@/app/utils/DateUtils';

import { iconsWeather, iconsFeeling } from './DiaryIcons';

// Id 있으면 read, 없으면 create 상태임
interface Props {
  id?: string
  isUpdate?: boolean
}

const DiaryHeader: React.FC<Props> = ({ id, isUpdate }) => {
  const {
    date, weather, feeling,
    setDate, setWeather, setFeeling
  } = useDiaryStore();
  const isRead = (id && isUpdate === undefined) ? true : false;
  const today = dayjs();
  const diaryDate = date ? dayjs(fullDateFormat(date)) : undefined;

  // id로 일기 조회 후 zustand 데이터 변경
  useEffect(() => {
    // 리셋
    DiaryDataResetReadId(id);
  }, [id]);

  // create에서 날짜 변경
  const handelChangeDate = (e: Dayjs | "") => {
    !isRead && e && setDate(e.format("YYYYMMDD"));
  }

  // create에서 아이콘 클릭 시 색상 변경 & 저장
  const handleIconSelet = (type: string, key: string) => {
    if (!isRead) {
      { type === "weather" && setWeather(key) }
      { type === "feeling" && setFeeling(key) }
    }
  }

  return (
    <>
      <div className={styles.diary__date}>
        <div className={styles.diary__datepicker}>
          <DatePicker
            variant={"borderless"}
            placeholder='날짜'
            maxDate={today}
            value={date && diaryDate}
            disabled={id ? true : false}
            onChange={(e) => handelChangeDate(e)}
            key={"diaryDate"}
          />
        </div>

        <ul className={[styles.diary__weather, isRead && styles.icon__fixed].join(" ")}>
          {Object.entries(iconsWeather).map(([key, item]) => (
            <div
              className={`${weather === key && styles.active}`}
              onClick={() => handleIconSelet("weather", key)}
              key={key}
            >
              {item}
            </div>
          ))}
        </ul>
      </div>

      <ul className={[styles.diary__feeling, isRead && styles.icon__fixed].join(" ")}>
        {Object.entries(iconsFeeling).map(([key, item]) => (
          <div
            className={`${feeling === key && styles.active}`}
            onClick={() => handleIconSelet("feeling", key)}
            key={key}
          >
            {item}
          </div>
        ))}
      </ul>
    </>
  );
}

export default DiaryHeader;

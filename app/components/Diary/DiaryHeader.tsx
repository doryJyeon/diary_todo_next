"use client";

import React, { useEffect } from 'react';
import styles from "./../../diary/page.module.css";
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useDiaryStore } from '../store/useDiaryStore';
import { DiaryDataResetReadId, DiaryDatesRead } from '@/app/utils/DiaryUtils';
import { fullDateFormat } from '@/app/utils/DateUtils';

import { iconsWeather, iconsFeeling } from './DiaryIcons';
import { DiaryOneProps } from '@/app/interfaces/DiaryProps';
import { RangePickerProps } from 'antd/es/date-picker';

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
  // isRead ? 날씨, 기분 변경 불가 : 날씨, 기분 선택 가능
  const isRead = (id && isUpdate === undefined) ? true : false;
  // DatePicker에 맞게 값 변경
  const today = dayjs();
  const diaryDate = date ? dayjs(fullDateFormat(date)) : undefined;
  // DatePicker disabled 표시
  const dateList = DiaryDatesRead();

  // id로 일기 조회 후 zustand 데이터 변경
  useEffect(() => {
    // store 데이터 변경
    if (id) {
      const readStore: DiaryOneProps = DiaryDataResetReadId(id);
      setDate(readStore.date);
      setWeather(readStore.weather);
      setFeeling(readStore.feeling);
    } else {
      setDate("");
      setWeather("");
      setFeeling("");
    }
  }, [id]);

  // datePicker day disabled (일기 있는 날 제외)
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    const existDate = current.format("YYYYMMDD");
    return dateList?.indexOf(existDate) === -1 ? false : true;
  };

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
            disabledDate={disabledDate}
            onChange={(e) => handelChangeDate(e)}
            key={"diaryDate"}
          />
        </div>

        <ul className={[styles.diary__weather, isRead && styles.icon__fixed].join(" ")}>
          {iconsWeather && Object.entries(iconsWeather).map(([key, item]) => (
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
        {iconsFeeling && Object.entries(iconsFeeling).map(([key, item]) => (
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

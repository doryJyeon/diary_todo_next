"use client";

import React from 'react';
import type { CalendarProps } from 'antd';
import { Calendar } from 'antd';
import type { Dayjs } from 'dayjs';

// 날짜별 content 셋팅
const getListData = (value: Dayjs) => {
  let listData: { content: string }[] = [];

  switch (value.date()) {
    case 1:
      listData = [
        { content: "" },
      ];
      break;
    default:
  }
  return listData || [];
};

const DiaryList: React.FC = () => {
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            {item.content}
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current) => {
    return dateCellRender(current);
  };

  return <Calendar cellRender={cellRender} />;
};

export default DiaryList;
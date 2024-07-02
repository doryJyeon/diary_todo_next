"use client";

import DiaryContent from '@/app/components/Diary/DiaryContent';
import DiaryHeader from '@/app/components/Diary/DiaryHeader';
import { usePathname } from 'next/navigation';
import React from 'react';

const ReadPage = () => {
  const pathname = usePathname();
  const dateId = pathname.split("/")[3];

  return (
    <>
      {/* 날짜, 날씨, 느낌 */}
      <DiaryHeader id={dateId} isUpdate={true} />
      {/* 일기 내용 */}
      <DiaryContent id={dateId} isUpdate={true} />
    </>
  );
}

export default ReadPage;

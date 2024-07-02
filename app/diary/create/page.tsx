import React from 'react';
import TomorrowTodo from '../../components/Diary/TomorrowTodo';
import DiaryHeader from './../../components/Diary/DiaryHeader';
import DiaryContent from './../../components/Diary/DiaryContent';

const CreatePage = () => {
  return (
    <>
      {/* 날짜, 날씨, 느낌 */}
      <DiaryHeader />
      {/* 일기 내용 */}
      <DiaryContent />
      {/* 내일 할 일 */}
      <TomorrowTodo />
    </>
  );
}

export default CreatePage;

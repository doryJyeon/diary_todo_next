import { DiaryDataProps, DiaryIcons, DiaryOneProps } from "../interfaces/DiaryProps";
import { createStorage, readStorage, updateStorage } from "./LocalStorage";

// diary 생성/수정은 zustand의 정보로 이뤄짐 ===========================!!

/**
 * diary read, 달력에서 사용, 순서 상관 없음
 * [일자]: feeling 만 전달
 */
export const DiaryListRead = () => {
  const DiaryData: DiaryDataProps = readStorage("diary");
  const DateFeelings: DiaryIcons = {};
  DiaryData && Object.keys(DiaryData).forEach(date => {
    DateFeelings[date] = DiaryData[date].feeling
  })

  return DateFeelings !== null ? DateFeelings : null
}

/**
 * diary date read, 일기 생성에서 선택 불가 일자 체크용, 순서 상관 없음
 * 일자만 전달
 */
export const DiaryDatesRead = () => {
  const DiaryData: DiaryDataProps = readStorage("diary");
  const DateFeelings: string[] = [];
  DiaryData && Object.keys(DiaryData).forEach(date => {
    DateFeelings.push(date)
  })

  return DateFeelings.length > 0 ? DateFeelings : null
}

/**
 * 1. diary zustand 정보 reset, 저장, 수정, 삭제 전부 실행해줘야함
 * 2. 수정/삭제를 위한 id가 있으면 해당 정보로 바꿔줌
 */
export const DiaryDataResetReadId = (dateId?: string) => {
  const DiaryData: DiaryDataProps = readStorage("diary");

  // return 데이터 받아서 setStore 실행
  if (dateId && DiaryData[dateId] !== null && DiaryData[dateId] !== undefined) {
    return {
      date: dateId,
      ...DiaryData[dateId]
    };
  } else {
    return {
      date: "",
      weather: "",
      feeling: "",
      content: ""
    };
  }
}

/**
 * diary create, 생성 시 사용, 일기장은 1일 1일기 가능
 * 생성 시 정보는 zustand에 보관된걸 가져옴
 */
export const DiaryCreate = (data: DiaryOneProps) => {
  const DiaryData: DiaryDataProps = readStorage("diary");
  // 로컬 스토리지 없으면 초기 생성
  if (DiaryData === null || DiaryData === undefined) {
    const newDate: DiaryDataProps = {
      [data.date]: {
        weather: data.weather,
        feeling: data.feeling,
        content: data.content.trim()
      }
    }
    createStorage("diary", newDate);
  } else {
    // 로컬 스토리지 있으면 update call
    DiaryUpdate(data);
  }
}

/**
 * diary update, 생성/수정 시 사용, 일기장은 1일 1일기 가능
 * update 정보는 zustand에 보관된걸 가져옴
 */
export const DiaryUpdate = (data: DiaryOneProps) => {
  const DiaryData: DiaryDataProps = readStorage("diary");
  // 로컬 스토리지 없을 수 없기 때문에 null 검증 안함.
  const newDate: DiaryDataProps = {
    ...DiaryData,
    [data.date]: {
      weather: data.weather,
      feeling: data.feeling,
      content: data.content.trim()
    }
  }

  updateStorage("diary", newDate);
}

/**
 * diary delete, 해당 날짜의 정보만 삭제
 * @param {string} date 지우고 싶은 날짜
 */
export const DiaryDelete = (date: string) => {
  const DiaryData: DiaryDataProps = readStorage("diary");
  if (DiaryData[date]) {
    const newDate: DiaryDataProps = DiaryData;
    delete newDate[date];

    updateStorage("diary", newDate);
  }
}

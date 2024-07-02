export interface DiaryDataProps {
  [date: string]: DiaryProps
}

export interface DiaryProps {
  weather: string
  feeling: string
  content: string
}
// C U D 용 데이터 모음
export interface DiaryOneProps {
  date: string
  weather: string
  feeling: string
  content: string
}

// 달력 표시용 아이콘 
export interface DiaryIcons {
  [date: string]: string
}
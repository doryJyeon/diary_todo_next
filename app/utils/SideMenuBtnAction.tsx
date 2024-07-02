"use client";

import { message } from "antd";
import { DiaryCreate, DiaryDelete, DiaryUpdate } from "./DiaryUtils";
import { DiaryOneProps } from "../interfaces/DiaryProps";
import { ButtonAction } from "../interfaces/SideMenuProps";

export const SideMenuActions = (data: DiaryOneProps, action: ButtonAction) => {
  // 필요 값 체크
  if (!data.date) return message.error("No Date!")
  if (action === "addDiary" || action === "updateDiary") {
    if (!data.weather) return message.error("날씨를 선택해주세요.")
    if (!data.feeling) return message.error("날씨 아래 이모티콘을 선택해주세요.")
    if (data.content.length < 5) return message.error("일기는 5자 이상 작성해주세요.")
  }

  switch (action) {
    case "addDiary":
      DiaryCreate(data);
      message.success("저장했습니다.");
      break;
    case "updateDiary":
      DiaryUpdate(data);
      message.success("수정했습니다.");
      break;
    case "delDiary":
      DiaryDelete(data.date);
      message.success("삭제했습니다.");
      break;
  }
}
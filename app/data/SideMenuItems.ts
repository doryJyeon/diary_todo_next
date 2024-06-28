import { SideMenuItmesProps } from "../interfaces/SideMenuProps";

/**
 * 해당 타입일 때 보여줘야하는 버튼
 * link: modal >> modal show
 */
export const SideMenuItems: SideMenuItmesProps = {
  "todo": {
    0: {
      title: "한 줄 추가",
      link: "modal",
      icon: "pencil",
      color: "mint",
      modal: "addTodo"
    },
    1: {
      title: "여러개 추가",
      link: "modal",
      icon: "pencil",
      color: "yellow",
      modal: "addTodoMulti"
    },
    2: {
      title: "일기장 보기",
      link: "/diary",
      icon: "book",
      color: "red"
    }
  },
  "diary": {
    0: {
      title: "일기 쓰기",
      link: "/diary/create",
      icon: "pencil",
      color: "red"
    },
    1: {
      title: "일기 보기",
      link: "/diary",
      icon: "calendar",
      color: "yellow"
    },
    2: {
      title: "일기 삭제",
      link: "modal",
      icon: "trash",
      color: "navy",
      modal: "delDiary"
    },
    3: {
      title: "To-do List",
      link: "/",
      icon: "note",
      color: "mint"
    }
  }
}

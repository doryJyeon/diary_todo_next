export interface SideMenuItmesProps {
  [type: string]: {
    [index: number]: SideMenuItemProps
  }
}

type Icons = "pencil" | "pencilNote" | "saveFile" | "calendar" | "trash" | "book" | "note";
type ModalCommand = "addTodo" | "addTodoMulti";
export type ButtonAction = "addDiary" | "moveUpdateDiary" | "updateDiary" | "delDiary";

export interface SideMenuItemProps {
  title: string
  link: string
  icon: Icons
  color: string,
  modal?: ModalCommand,
  buttonAction?: ButtonAction
}

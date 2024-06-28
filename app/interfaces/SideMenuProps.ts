export interface SideMenuItmesProps {
  [type: string]: {
    [index: number]: SideMenuItemProps
  }
}

type Icons = "pencil" | "calendar" | "trash" | "book" | "note";
type ModalCommand = "addTodo" | "addTodoMulti" | "delDiary";

export interface SideMenuItemProps {
  title: string
  link: string
  icon: Icons
  color: string,
  modal?: ModalCommand
}

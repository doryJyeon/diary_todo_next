type TodoState = "not" | "done";

export interface TodoDataProps {
  [key: string]: {
    detail: string
    state: TodoState
  }
}

export interface TodoListDataProps {
  [createDate: string]: TodoDataProps
}
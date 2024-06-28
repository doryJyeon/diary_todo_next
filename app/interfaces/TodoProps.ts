export interface TodoListDataProps {
  [createDate: string]: TodoDataProps
}

type TodoState = "not" | "done";

// 불러올 때는 내림차순으로 써야함
export interface TodoDataProps {
  [key: number]: {
    detail: string
    state: TodoState
  }
}
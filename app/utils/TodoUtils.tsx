import { TodoDataProps, TodoListDataProps } from "../interfaces/TodoProps";
import { fullDate, getFullDate } from "./DateUtils";
import { readStorage, updateStorage } from "./LocalStorage";

const getTodoList = () => {
  const TodoData: TodoListDataProps = readStorage("todo_list");

  return (!TodoData || TodoData === null || TodoData === undefined) ? null : TodoData
}

/**
 * todo list filtering
 */
const TodoFiltering = (filter: string) => {
  const TodoData = getTodoList();
  if (TodoData === null) return null

  if (filter !== "") {
    const filteredData: TodoListDataProps = {};

    Object.entries(TodoData).forEach(([date, todos]) => {
      const filteredTodos: TodoDataProps = {}; // 필터링 된 Todos 담을 객체
      Object.entries(todos).forEach(([key, todo]) => {
        if (todo.state === filter) filteredTodos[key] = todo;
      });

      // 필터링된 todo가 있는 경우에만 최종 추가
      if (Object.keys(filteredTodos).length > 0) {
        filteredData[date] = filteredTodos;
      }
    });

    return filteredData
  } else {
    return TodoData
  }
}

/**
 * Todo list 읽을 때 날짜별 내림차순 정렬해줌
 * 날짜별로만 순서는 ASC
 * return sortKey, fullData
 */
export const TodoReadDesc = (filter: string) => {
  // 필터링 된 todolist
  const TodoData = TodoFiltering(filter);
  if (TodoData === null) return null;

  // 날짜 sort
  const dateKeySort = Object.keys(TodoData)
    .map(date => parseInt(date))
    .sort((a, b) => b - a)
    .map(date => date.toString());

  return { dateKeySort, TodoData };
}

/**
 * 일기장 tomorrow Todo list 읽어오기
 * 일기장에서 보여주는거여서 순서는 ASC로 
 */
export const TomorrowTodoRead = () => {
  const todoData: TodoListDataProps = readStorage("todo_list");
  const tomorrow = getFullDate(1);
  return !todoData[tomorrow] ? {} : todoData[tomorrow];
}

/**
 * 완전 초기 To-do 생성
 */
const createFirstTodo = (fullDate: string, addItems: TodoDataProps) => {
  const newData: TodoListDataProps = {
    [fullDate]: {
      ...addItems
    }
  }

  updateStorage("todo_list", newData);
}

/**
 * 생성 관련 count key return
 */
const getNextCountkey = (fullDate: string) => {
  const TodoData = getTodoList();
  if (TodoData === null || TodoData[fullDate] === undefined || TodoData[fullDate] === null) return 0;

  const sortedKeys = Object.keys(TodoData[fullDate]).sort((a, b) => parseInt(a) - parseInt(b));
  return (Number(sortedKeys[sortedKeys.length - 1]) + 1) || 0;
}

/**
 * To-do list 하나 추가 할 때
 * @param {string} addText
 */
export const createTodo = (addText: string) => {
  const TodoData = getTodoList();
  const keyCount = getNextCountkey(fullDate);
  const newItem: TodoDataProps = {
    [keyCount]: {
      detail: addText,
      state: "not"
    }
  }

  // 없으면 초기 생성
  if (TodoData === null || Object.keys(TodoData).length === 0) return createFirstTodo(fullDate, newItem);

  const newData: TodoListDataProps = {
    ...TodoData,
    [fullDate]: {
      ...TodoData[fullDate],
      ...newItem
    }
  }

  updateStorage("todo_list", newData);
}

/**
 * To-do list 멀티로 여러줄 추가 할 때
 * @param {string} addText
 * @param {number} addDay : 현재 일자 + {addDay}, 없으면 오늘로 설정
 */
export const createTodoMulti = (addText: string, addDay?: number) => {
  const TodoData = getTodoList();
  const fullDateKey = addDay ? getFullDate(addDay) : fullDate;
  const keyCount = getNextCountkey(fullDateKey);

  // # 기준으로 잘라서 newItem 생성, 맨 앞은 null 들어와서 버림
  const textArr = addText.split("#");
  textArr.shift();

  const newItem: TodoDataProps = {}
  textArr.forEach((value: string, index: number) => (
    value.trim() === ""
      ? null
      : newItem[keyCount + index] = {
        detail: value.replace(/\\n/g, ""),
        state: "not"
      }
  ));

  // 없으면 초기 생성
  if (TodoData === null || Object.keys(TodoData).length === 0) return createFirstTodo(fullDateKey, newItem);

  const newData: TodoListDataProps = {
    ...TodoData,
    [fullDateKey]: {
      ...TodoData[fullDateKey],
      ...newItem
    }
  }

  updateStorage("todo_list", newData);
}


/**
 * To-do list 삭제
 * @param {string} date
 * @param {number} key
 */
export const deleteTodo = (date: string, key: number) => {
  const TodoData = getTodoList();
  if (TodoData === null) return null;

  // 해당 날짜에 todo 1개면 날짜도 삭제
  if (Object.keys(TodoData[date]).length <= 1) {
    delete TodoData[date]
  } else {
    delete TodoData[date][key]
  }

  updateStorage("todo_list", TodoData);
}

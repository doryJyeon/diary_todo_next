import { TodoDataProps, TodoListDataProps } from "../interfaces/TodoProps";
import { fullDate } from "./DateUtils";
import { readStorage, updateStorage } from "./LocalStorage";

const TodoData: TodoListDataProps = readStorage("todo_list");

/**
 * Todo list 읽을 때 날짜별 내림차순 정렬해줌
 */
export const TodoReadDesc = () => {
  if (!TodoData) return null

  const sortedDates = Object.keys(TodoData)
    .map(date => parseInt(date))
    .sort((a, b) => b - a); // date 숫자 변경 후 내림차순 정렬

  const sortedTodoData: TodoListDataProps = {};
  sortedDates.forEach(date => {
    // 각 날짜의 키(key)를 숫자로 변환하고 내림차순으로 정렬
    const sortedKeys = Object.keys(TodoData[date.toString()])
      .map(key => parseInt(key))
      .sort((a, b) => b - a);

    // key대로 정렬한 새로운 객체를 생성
    const sortedItems = sortedKeys.reduce((acc: TodoDataProps, key) => {
      acc[key] = TodoData[date.toString()][key];
      return acc;
    }, {});

    // 최종 구조에 추가
    sortedTodoData[date.toString()] = sortedItems;
  });

  return sortedTodoData;
}

/**
 * 완전 초기 To-do 생성
 */
const createFirstTodo = (addText: string) => {
  const newData: TodoListDataProps = {
    [fullDate]: {
      [0]: {
        detail: addText,
        state: "not"
      }
    }
  }

  updateStorage("todo_list", newData);
}

/**
 * 생성 관련 count key return
 */
const getNextCountkey = (fullDate: string) => {
  const sortedKeys = Object.keys(TodoData[fullDate]).sort((a, b) => parseInt(a) - parseInt(b));
  return (Number(sortedKeys[sortedKeys.length - 1]) + 1) || 0;
}

/**
 * To-do list 추가 할 때
 * @param {string} addText
 */
export const createTodo = (addText: string) => {
  // 없으면 초기 생성
  if (TodoData === null || Object.keys(TodoData).length === 0) return createFirstTodo(addText);

  const keyCount = getNextCountkey(fullDate);

  const newData: TodoListDataProps = {
    ...TodoData,
    [fullDate]: {
      ...TodoData[fullDate],
      [keyCount]: {
        detail: addText,
        state: "not"
      }
    }
  }

  updateStorage("todo_list", newData);
}

/**
 * To-do list 멀티로 여러줄 추가 할 때
 * @param {string} addText
 */
export const createTodoMulti = (addText: string) => {
  const keyCount = getNextCountkey(fullDate);

}
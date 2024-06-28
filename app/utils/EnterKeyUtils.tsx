import { Dispatch } from "react";

/**
 * key down >> enter key면 function 실행하는 utils
 * @param event
 * @param function
 * @param noEnter 엔터키 막음
 */
export const handleEnterKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  actionFn: Dispatch<any>,
  noEnter?: boolean
): void => {
  if (event.key === "Enter") {
    if (noEnter) event.preventDefault();
    actionFn(null);
  }
}

/**
 * key down >> enter key면 function 실행하는 utils
 * @param event
 * @param function
 */
export const handleEnterKeyUp = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  actionFn: Dispatch<any>
): void => {
  if (event.key === "Enter") {
    actionFn(null);
  }
}
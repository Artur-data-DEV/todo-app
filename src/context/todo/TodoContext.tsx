// src/context/TodoContext.ts
import { createContext, Dispatch } from "react";
import { TodoAction, TodoState } from "../../reducers/todoReducer";

export interface TodoContextType {
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  moveTodo: (id: number, fromColumn: string, toColumn: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

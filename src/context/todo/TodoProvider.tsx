// src/context/TodoProvider.tsx
import React, { ReactNode, useReducer, useEffect, useCallback } from "react";
import { TodoContext } from "./TodoContext";
import {
  todoReducer,
  initialState,
  TodoState,
} from "../../reducers/todoReducer";

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Carregar tarefas do LocalStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      dispatch({ type: "SET_TODOS", todos: parsedTodos });
    }
  }, []);

  // Salvar tarefas no LocalStorage
  useEffect(() => {
    const { todo, inProgress, completed } = state;
    if (todo.length || inProgress.length || completed.length) {
      localStorage.setItem("todos", JSON.stringify(state));
    }
  }, [state]);

  // Função para adicionar uma nova tarefa
  const addTodo = useCallback((text: string) => {
    dispatch({ type: "ADD_TODO", text });
  }, []);

  // Função para remover uma tarefa
  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE_TODO", id });
  }, []);

  // Função para remover todas as tarefas
  const removeAll = useCallback(() => {
    dispatch({ type: "REMOVE_ALL", todos: state.completed });
  }, [state]);

  // Função para mover uma tarefa entre as colunas
  const moveTodo = useCallback(
    (id: number, fromColumn: keyof TodoState, toColumn: keyof TodoState) => {
      {
        dispatch({ type: "MOVE_TODO", id, fromColumn, toColumn });
      }
    },
    []
  );

  return (
    <TodoContext.Provider
      value={{
        state,
        dispatch,
        addTodo,
        removeTodo,
        removeAll,
        moveTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

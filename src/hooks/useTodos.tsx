// src/hooks/useTodos.ts
import { useContext } from "react";
import { TodoContext } from "../context/todo/TodoContext";

// Hook para acessar o contexto de todos
export const useTodos = () => useContext(TodoContext);

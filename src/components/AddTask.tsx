// src/components/AddTask.tsx
import React, { useState, useContext } from "react";
import { TodoContext } from "../context/todo/TodoContext";

export const AddTask: React.FC = () => {
  const [text, setText] = useState("");
  const { addTodo } = useContext(TodoContext)!;

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleAddTask}
      className="flex mb-4 p-2 bg-white shadow-md rounded-md"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border-2 p-3 rounded-l-md w-72 focus:outline-none"
        placeholder="Digite uma nova tarefa"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-3 px-6 rounded-r-md"
      >
        Adicionar
      </button>
    </form>
  );
};

// src/components/mobile/TaskListMobile.tsx
import { FC, useContext } from "react";
import { Todo, TodoState } from "../../reducers/todoReducer";
import { TodoContext } from "../../context/todo/TodoContext";

interface TaskListProps {
  column: keyof TodoState;
}

export const TaskListMobile: FC<TaskListProps> = ({ column }) => {
  const { state, moveTodo, removeTodo } = useContext(TodoContext)!;
  const tasks = state[column];

  const handleClearCompleted = () => {
    tasks
      .filter((task: Todo) => task.completed)
      .forEach((task: Todo) => removeTodo(task.id));
  };

  const handleRemoveTodo = (id: number) => {
    if (window.confirm("Tem certeza que deseja remover esta tarefa?")) {
      removeTodo(id);
    }
  };

  const handleMoveTodo = (task: Todo) => {
    moveTodo(
      task.id,
      column,
      column === "todo"
        ? "inProgress"
        : column === "inProgress"
        ? "completed"
        : column === "completed"
        ? "inProgress"
        : "todo"
    );
  };

  // Estilos para cada coluna
  const columnStyles = {
    todo: "bg-blue-200 text-blue-800",
    inProgress: "bg-yellow-200 text-yellow-800",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <div
      className={`flex flex-col p-4 border-2 rounded-lg w-full ${columnStyles[column]} space-y-4`}
    >
      <h3 className="font-semibold text-2xl mb-4 text-center text-gray-800">
        {column.charAt(0).toUpperCase() + column.slice(1)}
      </h3>

      {/* Botão para limpar as tarefas concluídas */}
      {column === "completed" && (
        <button
          onClick={handleClearCompleted}
          className="bg-red-500 text-white py-3 px-6 rounded-md mb-4 self-center w-full sm:w-auto"
        >
          Limpar Concluídas
        </button>
      )}

      {/* Lista de Tarefas */}
      <div className="flex flex-col gap-4">
        {tasks.map((task: Todo) => (
          <div
            key={task.id}
            className="p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition duration-300"
          >
            <p className="text-lg font-semibold text-gray-800">{task.text}</p>
            <div className="flex flex-col gap-2 mt-2">
              <button
                onClick={() => handleRemoveTodo(task.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md w-full text-sm"
              >
                Remover
              </button>

              <button
                onClick={() => handleMoveTodo(task)}
                className={`${
                  column === "completed"
                    ? "bg-yellow-400 text-white"
                    : "bg-blue-500 text-white"
                } py-2 px-4 rounded-md w-full text-sm`}
              >
                Mudar para{" "}
                {column === "todo"
                  ? "Em andamento"
                  : column === "inProgress"
                  ? "Concluído"
                  : "Em andamento"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

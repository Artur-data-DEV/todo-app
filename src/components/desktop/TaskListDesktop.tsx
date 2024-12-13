// src/components/TaskListDesktop.tsx
import { DragEvent, FC, useContext } from "react";
import { TodoContext } from "../../context/todo/TodoContext";
import { Todo, TodoState } from "../../reducers/todoReducer";

interface TaskListProps {
  column: keyof TodoState;
}

export const TaskListDesktop: FC<TaskListProps> = ({ column }) => {
  const { state, moveTodo, removeTodo } = useContext(TodoContext)!;
  const tasks = state[column];

  const handleDragStart = (e: DragEvent, id: number) => {
    e.dataTransfer.setData("id", id.toString());
    e.dataTransfer.setData("fromColumn", column);
  };

  const handleDrop = (e: DragEvent) => {
    const id = parseInt(e.dataTransfer.getData("id"));
    const fromColumn = e.dataTransfer.getData("fromColumn") as keyof TodoState;
    moveTodo(id, fromColumn, column);

    if (column === "completed") {
      const task = state[fromColumn].find((task: Todo) => task.id === id);
      if (task) task.completed = true;
    }
  };

  const handleClearCompleted = () => {
    tasks
      .filter((task: Todo) => task.completed)
      .forEach((task: Todo) => removeTodo(task.id));
  };

  const handleRemoveTodo = (id: number) => {
    if (window.confirm("Tem certeza que deseja remover esta tarefa?")) {
      removeTodo(id);
    } else {
      return;
    }
  };

  const columnStyles = {
    todo: "bg-blue-200 text-blue-800",
    inProgress: "bg-yellow-200 text-yellow-800",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <div
      className={`flex flex-col p-6 border-2 rounded-lg w-full ${columnStyles[column]} shadow-lg space-y-6`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h3 className="font-semibold text-2xl mb-4 text-center text-gray-800">
        {column.charAt(0).toUpperCase() + column.slice(1)}
      </h3>

      {/* Botão para limpar as tarefas concluídas */}
      {column === "completed" && (
        <button
          onClick={handleClearCompleted}
          className="bg-red-500 text-white py-3 px-6 rounded-md mb-4 self-center w-full sm:w-auto hover:bg-red-600 transition-colors"
        >
          Limpar Concluídas
        </button>
      )}

      {/* Lista de Tarefas */}
      <div className="flex flex-col gap-6">
        {tasks.map((task: Todo) => (
          <div
            key={task.id}
            className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-xl transition-all duration-300"
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
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
                onClick={() => {
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
                }}
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

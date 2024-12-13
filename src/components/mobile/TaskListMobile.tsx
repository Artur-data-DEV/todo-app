import React, { FC, useContext, useCallback } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { Todo, TodoState } from "../../reducers/todoReducer";
import { TodoContext } from "../../context/todo/TodoContext";

interface TaskListProps {
  column: keyof TodoState;
}

const ItemType = {
  TODO: "todo",
};

interface DraggableTodoProps {
  task: Todo;
  column: keyof TodoState;
  handleMoveTodo: (task: Todo) => void;
  handleRemoveTodo: (id: number) => void;
}

const DraggableTodo: FC<DraggableTodoProps> = ({
  task,
  column,
  handleMoveTodo,
  handleRemoveTodo,
}) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: ItemType.TODO,
      item: { task, column },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [task, column]
  );

  const [, dropRef] = useDrop(
    () => ({
      accept: ItemType.TODO,
      drop: (draggedItem: { task: Todo; column: keyof TodoState }) => {
        if (draggedItem.task.id !== task.id) {
          handleMoveTodo(draggedItem.task);
        }
      },
    }),
    [task]
  );
  const { moveTodo } = useContext(TodoContext)!;
  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={`p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition duration-300 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
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
              : column === "inProgress"
              ? "bg-green-500 text-white"
              : "bg-yellow-400 text-white"
          } py-2 px-4 rounded-md w-full text-sm`}
        >
          Mudar para{" "}
          {column === "todo"
            ? "Em andamento"
            : column === "inProgress"
            ? "Concluído"
            : "Em andamento"}
        </button>
        {column === "completed" && (
          <button
            onClick={() => moveTodo(task.id, column, "todo")}
            className={
              "bg-blue-500 text-white py-2 px-4 rounded-md w-full text-sm"
            }
          >
            Mudar para à fazer
          </button>
        )}
      </div>
    </div>
  );
};

export const TaskListMobile: FC<TaskListProps> = React.memo(({ column }) => {
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

  const handleMoveTodo = useCallback(
    (task: Todo) => {
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
    },
    [moveTodo, column]
  );

  const columnStyles = {
    todo: "bg-blue-200 text-blue-800",
    inProgress: "bg-yellow-200 text-yellow-800",
    completed: "bg-green-200 text-green-800",
  };

  return (
    <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
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
            <DraggableTodo
              key={task.id}
              task={task}
              column={column}
              handleMoveTodo={handleMoveTodo}
              handleRemoveTodo={handleRemoveTodo}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
});

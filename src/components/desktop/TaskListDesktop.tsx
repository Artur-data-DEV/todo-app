import React, { DragEvent, FC } from "react";
import { Todo, TodoState } from "../../reducers/todoReducer";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS para o Toastify
import { confirmAlert } from "react-confirm-alert"; // Importa a função confirmAlert
import "react-confirm-alert/src/react-confirm-alert.css"; // Importa o CSS para o confirmAlert
import { useTodos } from "../../hooks/useTodos";

interface TaskListProps {
  column: keyof TodoState;
}

export const TaskListDesktop: FC<TaskListProps> = React.memo(({ column }) => {
  const { state, moveTodo, removeTodo, removeAll } = useTodos()!;
  const tasks = state[column];

  const handleDragStart = (e: DragEvent, id: number) => {
    e.dataTransfer.setData("id", id.toString());
    e.dataTransfer.setData("fromColumn", column);
  };

  const handleDrop = (e: DragEvent) => {
    const id = parseInt(e.dataTransfer.getData("id"));
    const fromColumn = e.dataTransfer.getData("fromColumn") as keyof TodoState;
    if (fromColumn === column) {
      return; // Se a tarefa já estiver na mesma coluna, não faz nada
    }

    moveTodo(id, fromColumn, column);

    if (column === "completed") {
      const task = state[fromColumn].find((task: Todo) => task.id === id);
      if (task) task.completed = true;
    }
  };

  const handleClearCompleted = () => {
    confirmAlert({
      title: "Confirmação",
      message: "Você tem certeza que deseja remover esta tarefa?",
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            removeAll()
            toast.success("Tarefas concluídas removidas com sucesso!");
          },
        },
        {
          label: "Não",
          onClick: () => {
            toast.info("As tarefas não foram removidas.");
          },
        },
      ],
      customUI: ({ onClose }) => (
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#333" }}>Tem certeza?</h2>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Você está prestes a remover todas tarefas concluídas.
          </p>
          <div>
            <button
              onClick={() => {
                onClose();
                // Chama a remoção com confirmação
                removeAll();
                toast.success("Tarefas removidas com sucesso!");
              }}
              style={{
                backgroundColor: "#ff4d4d",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Sim
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "#ccc",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Não
            </button>
          </div>
        </div>
      ),
    });
  };

  // Função de remoção com confirmação personalizada
  const handleRemoveTodo = (id: number) => {
    confirmAlert({
      title: "Confirmação",
      message: "Você tem certeza que deseja remover esta tarefa?",
      buttons: [
        {
          label: "Sim",
          onClick: () => {
            removeTodo(id);
            toast.success("Tarefa removida com sucesso!");
          },
        },
        {
          label: "Não",
          onClick: () => {
            toast.info("A tarefa não foi removida.");
          },
        },
      ],
      customUI: ({ onClose }) => (
        <div
          style={{
            padding: "20px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#333" }}>Tem certeza?</h2>
          <p style={{ marginBottom: "20px", color: "#555" }}>
            Você está prestes a remover esta tarefa.
          </p>
          <div>
            <button
              onClick={() => {
                onClose();
                // Chama a remoção com confirmação
                removeTodo(id);
                toast.success("Tarefa removida com sucesso!");
              }}
              style={{
                backgroundColor: "#ff4d4d",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Sim
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "#ccc",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Não
            </button>
          </div>
        </div>
      ),
    });
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

      {column === "completed" && (
        <button
          onClick={handleClearCompleted}
          className="bg-red-500 text-white py-3 px-6 rounded-md mb-4 self-center w-full sm:w-auto hover:bg-red-600 transition-colors"
        >
          Limpar Concluídas
        </button>
      )}

      <div className="flex flex-col gap-6">
        {tasks.map((task: Todo) => (
          <div
            key={task.id}
            className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:shadow-xl transition-all duration-300"
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
            onTouchStart={(e) =>
              handleDragStart(e as unknown as DragEvent, task.id)
            }
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
                    : column === "inProgress"
                    ? "bg-green-500 text-white"
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
              {column === "completed" && (
                <button
                  onClick={() => moveTodo(task.id, column, "todo")}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md w-full text-sm"
                >
                  Mudar para à fazer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

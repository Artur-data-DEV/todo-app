import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

export const handleClearCompleted = () => {
  confirmAlert({
    title: "Confirmação",
    message: "Você tem certeza que deseja remover esta tarefa?",
    buttons: [
      {
        label: "Sim",
        onClick: () => {
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

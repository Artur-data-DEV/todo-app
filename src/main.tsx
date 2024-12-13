import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DragDropContext } from "react-beautiful-dnd";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={TouchBackend} >
      <DragDropContext onDragEnd={() => {}}>
        <App />
      </DragDropContext>
    </DndProvider>
  </StrictMode>
);

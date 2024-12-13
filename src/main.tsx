import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DragDropContext } from "react-beautiful-dnd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DragDropContext onDragEnd={() => {}}>
      <App />
    </DragDropContext>
  </StrictMode>
);

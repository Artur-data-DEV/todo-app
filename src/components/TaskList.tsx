// src/components/TaskList.tsx
import { FC } from "react";
import { TaskListMobile } from "./mobile/TaskListMobile";
import { TaskListDesktop } from "./desktop/TaskListDesktop";
import { useWindowSize } from "@uidotdev/usehooks";

interface TaskListProps {
  column: "todo" | "inProgress" | "completed";
}

export const TaskList: FC<TaskListProps> = ({ column }) => {
  const { width } = useWindowSize();

  const isMobile = width != null && width < 768;

  return isMobile ? (
    <TaskListMobile column={column} />
  ) : (
    <TaskListDesktop column={column} />
  );
};

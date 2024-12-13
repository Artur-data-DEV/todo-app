import { TaskList } from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import { AddTask } from "./components/AddTask";
import { TodoProvider } from "./context/todo/TodoProvider";

const App: React.FC = () => {
  return (
    <>
      <TodoProvider>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Todo App</h1>
          <AddTask />
          <div className="flex space-x-4">
            <TaskList column="todo" />
            <TaskList column="inProgress" />
            <TaskList column="completed" />
          </div>
        </div>

        <ToastContainer />
      </TodoProvider>
    </>
  );
};
export default App;

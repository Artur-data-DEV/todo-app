// src/reducers/todoReducer.ts
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoState = {
  todo: Todo[];
  inProgress: Todo[];
  completed: Todo[];
};

export type TodoAction =
  | { type: "ADD_TODO"; text: string }
  | { type: "REMOVE_TODO"; id: number }
  | { type: "MOVE_TODO"; id: number; fromColumn: string; toColumn: string }
  | { type: "SET_TODOS"; todos: Todo[] }
  | { type: "REMOVE_ALL"; todos: Todo[] };

export const initialState: TodoState = {
  todo: [],
  inProgress: [],
  completed: [],
};

export const todoReducer = (
  state: TodoState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todo: [
          ...state.todo,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todo: state.todo.filter((todo) => todo.id !== action.id),
        inProgress: state.inProgress.filter((todo) => todo.id !== action.id),
        completed: state.completed.filter((todo) => todo.id !== action.id),
      };

    case "REMOVE_ALL":
      return {
        ...state,
        completed: state.completed.filter(
          (todo) => !action.todos.includes(todo)
        ),
      };

    case "MOVE_TODO": {
      const fromColumn = state[action.fromColumn as keyof TodoState];
      const toColumn = state[action.toColumn as keyof TodoState];

      // Encontre a tarefa que está sendo movida
      const [movedTask] = fromColumn.filter((todo) => todo.id === action.id);

      // Atualize o estado da tarefa se for movida para "completed"
      const updatedTask = {
        ...movedTask,
        completed: action.toColumn === "completed" ? true : false,
      };

      // Remova a tarefa da coluna de origem
      const updatedFromColumn = fromColumn.filter(
        (todo) => todo.id !== action.id
      );

      // Adicione a tarefa na coluna de destino
      const updatedToColumn = [...toColumn, updatedTask];

      return {
        ...state,
        [action.fromColumn]: updatedFromColumn,
        [action.toColumn]: updatedToColumn,
      };
    }

    case "SET_TODOS":
      return { ...state, ...action.todos };

    default:
      return state;
  }
};

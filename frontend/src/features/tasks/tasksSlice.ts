import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Task } from "../../types/Tasks";

// Define a type for the slice state
export interface TasksState {
  task: Task | null;
  list: Task[];
  modalState: boolean;
  searchString: string;
}

// Define the initial state using that type
export const initialState: TasksState = {
  task: null,
  list: [
    { id: 1, title: "Buy Grocery", description: "", isCompleted: true },
    { id: 2, title: "Code", description: "desc 2", isCompleted: false },
    { id: 3, title: "Sleep", description: "desc 3", isCompleted: false },
  ],
  modalState: false,
  searchString: "",
};

export const tasksSlice = createSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.list.push(action.payload);
    },
    editTask: (state, action) => {
      const updatedTaskList = state.list.map((task) => {
        if (action.payload?.id === task?.id) {
          return {
            ...task,
            title: action.payload.title,
            description: action.payload.description,
            isCompleted: action.payload.isCompleted,
          };
        } else {
          return task;
        }
      });
      state.list = updatedTaskList;
    },
    completedUpdate: (state, action) => {
      const updatedTaskList = state.list.map((task) => {
        if (action.payload === task?.id) {
          return {
            ...task,
            isCompleted: !task.isCompleted,
          };
        } else {
          return task;
        }
      });
      console.log("🚀 ~ updatedTaskList ~ updatedTaskList:", updatedTaskList);
      state.list = updatedTaskList;
    },
    deleteTask: (state, action) => {
      const updatedList = state.list.filter(
        (task) => task.id !== action.payload
      );
      state.list = updatedList;
    },
    selectTask: (state, action) => {
      state.task = action.payload;
    },
    searchTask: (state, action) => {
      state.searchString = action.payload;
    },
    showModal: (state) => {
      state.modalState = true;
    },
    hideModal: (state) => {
      state.modalState = false;
    },
    resetTask: (state) => {
      state.task = null;
    },
  },
});

export const {
  addTask,
  editTask,
  completedUpdate,
  deleteTask,
  selectTask,
  searchTask,
  showModal,
  hideModal,
  resetTask,
} = tasksSlice.actions;

export const selectedTask = (state: RootState) => state.tasks.task;

export const selectTasksList = (state: RootState) => state.tasks.list;

export const modalState = (state: RootState) => state.tasks.modalState;

export const searchString = (state: RootState) => state.tasks.searchString;

export default tasksSlice.reducer;

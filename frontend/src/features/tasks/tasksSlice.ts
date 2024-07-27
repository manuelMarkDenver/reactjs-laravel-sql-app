import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Task } from "../../types/Tasks";

// Define a type for the slice state
export interface TasksState {
  task: Task | null;
  list: Task[];
  modalState: boolean;
}

// Define the initial state using that type
export const initialState: TasksState = {
  task: null,
  list: [
    { id: 1, title: "Buy Grocery", description: "desc 1", isCompleted: true },
    { id: 2, title: "Code", description: "desc 2", isCompleted: false },
    { id: 3, title: "Sleep", description: "desc 3", isCompleted: false },
  ],
  modalState: false,
};

export const tasksSlice = createSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTask: (state) => {
      state.list.push({
        id: state.list.length + 1,
        title: "Wake up",
        description: `Desc ${state.list.length + 1}`,
        isCompleted: true,
      });
    },
    editTask: (state, action) => {
      state.task = action.payload;
    },
    deleteTask: (state, action) => {
      console.log("🚀 ~ action:", action);
      const updatedList = state.list.filter(
        (task) => task.id !== action.payload
      );
      state.list = updatedList;
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

export const { addTask, editTask, deleteTask, showModal, hideModal, resetTask } =
  tasksSlice.actions;

export const selectTask = (state: RootState) => state.tasks.task;

export const selectList = (state: RootState) => state.tasks.list;

export const modalState = (state: RootState) => state.tasks.modalState;

export default tasksSlice.reducer;

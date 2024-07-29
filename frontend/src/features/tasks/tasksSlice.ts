import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Task } from "../../types/Tasks";

export interface TasksState {
  task: Task | null;
  list: Task[];
  listIsLoading: boolean;
  modalState: boolean;
  searchString: string;
}

export const initialState: TasksState = {
  task: null,
  list: [],
  listIsLoading: false,
  modalState: false,
  searchString: "",
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.list = [...action.payload, ...state.list];
    },
    setListLoading: (state, action) => {
      state.listIsLoading = action.payload;
    },
    addTask: (state, action) => {
      state.list.unshift(action.payload);
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
  setTasks,
  setListLoading,
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

export const listIsLoading = (state: RootState) => state.tasks.listIsLoading;

export default tasksSlice.reducer;

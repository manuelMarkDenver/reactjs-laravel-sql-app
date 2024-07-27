import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { Task } from "../../types/Tasks";

// Define a type for the slice state
export interface TasksState {
  list: Task[];
}

// Define the initial state using that type
export const initialState: TasksState = {
  list: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTask: (state) => {
      state.list.push({
        title: "Task 1",
        isCompleted: true,
      });
    },
  },
});

export const { addTask } = tasksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.tasks.list;

export default tasksSlice.reducer;

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
  list: [
    { id: 1, title: "Buy Grocery", description: "desc 1", isCompleted: true },
    { id: 2, title: "Code", description: "desc 2", isCompleted: false },
    { id: 3, title: "Sleep", description: "desc 3", isCompleted: false },
  ],
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
    deleteTask: (state, action) => {
      console.log("🚀 ~ action:", action);
      const updatedList = state.list.filter(
        (task) => task.id !== action.payload
      );
      state.list = updatedList;
    },
  },
});

export const { addTask, deleteTask } = tasksSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectList = (state: RootState) => state.tasks.list;

export default tasksSlice.reducer;

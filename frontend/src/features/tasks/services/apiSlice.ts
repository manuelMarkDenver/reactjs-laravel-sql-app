// services/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type GetTasksResponse = Task[];

export const tasksApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, void>({
      query: () => "tasks",
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
    }),
    updateTask: builder.mutation<Task, Partial<Task> & Pick<Task, "id">>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: patch,
      }),
    }),
    deleteTask: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export type UseGetTasksQueryHook = typeof useGetTasksQuery;
export type UseAddTaskMutationHook = typeof useAddTaskMutation;
export type UseUpdateTaskMutationHook = typeof useUpdateTaskMutation;
export type UseDeleteTaskMutationHook = typeof useDeleteTaskMutation;

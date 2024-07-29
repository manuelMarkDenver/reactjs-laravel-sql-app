// services/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import useGlobalToast from "../../../components/GlobalToast";

type Task = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
};

type GetTasksResponse = Task[];

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, void>({
      query: () => "tasks",
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: "Tasks", id } as const)),
              { type: "Tasks", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: "Tasks", id: "LIST" }],
    }),

    addTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    updateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", id, (draft) => {
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    updateTaskStatus: builder.mutation<{ success: boolean; id: number },  number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "PUT",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        // Optimistically update the cache with the new isCompleted status
        const patchResult = dispatch(
          tasksApi.util.updateQueryData("getTasks", undefined, (draft) => {
            const task = draft.find((task) => task.id === id);
            if (task) {
              task.isCompleted = !task.isCompleted;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),

    deleteTask: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => {
        return [{ type: "Tasks", id }];
      },
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateTaskStatusMutation,
  useDeleteTaskMutation,
} = tasksApi;

export type UseGetTasksQueryHook = typeof useGetTasksQuery;
export type UseAddTaskMutationHook = typeof useAddTaskMutation;
export type UseUpdateTaskMutationHook = typeof useUpdateTaskMutation;
export type useUpdateTaskStatusMutationHook =
  typeof useUpdateTaskStatusMutation;
export type UseDeleteTaskMutationHook = typeof useDeleteTaskMutation;

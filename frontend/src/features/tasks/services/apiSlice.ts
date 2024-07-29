// services/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../../../types/Tasks";

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

    getSingleTask: builder.query<Task, number>({
      query: (id) => `tasks/${id}`, // URL to fetch a single task by ID
      providesTags: (result) =>
        result
          ? // If the result is available, provide tags for cache invalidation
            [
              { type: "Tasks", id: result.id }, // Tag for the specific task
              { type: "Tasks", id: "LIST" }, // Tag for the task list
            ]
          : // If there's no result (e.g., error case), provide a tag to refetch the list
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
          // @ts-expect-error
          tasksApi.util.updateQueryData("getTasks", id!, (draft) => {
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

    deleteTask: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => {
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetSingleTaskQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export type UseGetTasksQueryHook = typeof useGetTasksQuery;
export type useGetSingleTaskQueryHook = typeof useGetSingleTaskQuery;
export type UseAddTaskMutationHook = typeof useAddTaskMutation;
export type UseUpdateTaskMutationHook = typeof useUpdateTaskMutation;
export type UseDeleteTaskMutationHook = typeof useDeleteTaskMutation;

import { Box, Container, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Task } from "../../../types/Tasks";
import {
  searchString,
  selectTasksList,
  setListLoading,
  setTasks,
} from "../tasksSlice";
import TaskCard from "./TaskCard";
import { useGetTasksQuery } from "../services/apiSlice";
import { Suspense, useEffect, useState } from "react";
import LinearIndeterminate from "../../../components/LinearLoader";

const TasksContainer = () => {
  const [filteredLocalList, setFilteredLocalList] = useState<any[]>([]);
  const taskList: Task[] = useAppSelector(selectTasksList);

  const {
    data: tasksFromRtk,
    error,
    isLoading,
    isFetching,
  } = useGetTasksQuery();
  const dispatch = useAppDispatch();

  const searchStr = useAppSelector(searchString);

  const hasTask = () => taskList.length > 0;

  useEffect(() => {
    if (taskList.length === 0 && tasksFromRtk) {
      dispatch(setTasks(tasksFromRtk));
      dispatch(setListLoading(isFetching));
    }
  }, [taskList, tasksFromRtk, dispatch, isFetching]);

  useEffect(() => {
    if (tasksFromRtk && tasksFromRtk.length > 0 && searchStr.length > 0) {
      const filteredList = tasksFromRtk.filter((task) =>
        task.title.toLowerCase().includes(searchStr.toLowerCase())
      );
      setFilteredLocalList(filteredList);
    }
  }, [searchStr, taskList]);

  if (isLoading || isFetching) return <LinearIndeterminate />;

  if (error && "status" in error) return <div>Error: {error?.status}</div>;

  if (!hasTask)
    return <Typography>No task yet. Add some tasks today!</Typography>;

  const taskListArray =
    searchStr.length === 0 ? tasksFromRtk : filteredLocalList;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Box height="60vh" overflow="auto" paddingX={3}>
          <Stack justifyContent="center" gap={2}>
            {taskListArray &&
              Array.isArray(taskListArray) &&
              taskListArray.map((task) => {
                const { id } = task;
                return <TaskCard key={id} task={task} />;
              })}
          </Stack>
        </Box>
        <Typography
          variant="caption"
          fontStyle="italic"
          sx={{
            mt: 2,
            color: "gray",
          }}
        >
          {taskListArray && taskListArray.length} tasks found
        </Typography>
      </Suspense>
    </Container>
  );
};

export default TasksContainer;

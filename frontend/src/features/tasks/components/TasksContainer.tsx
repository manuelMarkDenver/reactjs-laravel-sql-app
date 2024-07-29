import { Box, Container, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Task } from "../../../types/Tasks";
import { searchString, selectTasksList, setTasks } from "../tasksSlice";
import TaskCard from "./TaskCard";
import { useGetTasksQuery } from "../services/apiSlice";
import { Suspense, useEffect, useState } from "react";
import LinearIndeterminate from "../../../components/LinearLoader";

const TasksContainer = () => {
  const [filteredLocalList, setFilteredLocalList] = useState<any[]>([]);
  const taskList: Task[] = useAppSelector(selectTasksList);

  const { data: tasksFromRtk, error, isLoading } = useGetTasksQuery();
  const dispatch = useAppDispatch();

  const searchStr = useAppSelector(searchString);

  const hasTask = () => taskList.length > 0;

  useEffect(() => {
    if (taskList.length === 0 && tasksFromRtk) {
      dispatch(setTasks(tasksFromRtk));
    }
  }, [taskList, tasksFromRtk, dispatch]);

  useEffect(() => {
    if (tasksFromRtk && tasksFromRtk.length > 0 && searchStr.length > 0) {
      const filteredList = tasksFromRtk.filter((task) =>
        task.title.toLowerCase().includes(searchStr.toLowerCase())
      );
      setFilteredLocalList(filteredList);
    }
  }, [searchStr, taskList]);

  if (isLoading) return <LinearIndeterminate />;

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
        <Box height="70vh" overflow="auto">
          <Stack justifyContent="center" gap={2}>
            {taskListArray &&
              Array.isArray(taskListArray) &&
              taskListArray.map((task) => {
                return <TaskCard key={task?.id} task={task} />;
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
          {taskListArray.length} tasks found
        </Typography>
      </Suspense>
    </Container>
  );
};

export default TasksContainer;

import { Box, Container, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { Task } from "../../../types/Tasks";
import { searchString, selectTasksList, setTasks } from "../tasksSlice";
import TaskCard from "./TaskCard";
import { useGetTasksQuery } from "../services/apiSlice";
import { Suspense, useEffect } from "react";

const TasksContainer = () => {
  const taskList: Task[] = useAppSelector(selectTasksList);
  console.log("🚀 ~ TasksContainer ~ taskList:", taskList);

  const { data: tasksFromRtk, error, isLoading } = useGetTasksQuery();

  const dispatch = useAppDispatch();

  const searchStr = useAppSelector(searchString);
  console.log("🚀 ~ TasksContainer ~ searchStr:", searchStr);

  // const filteredTasks =
  //   taskList &&
  //   taskList.length > 0 &&
  //   Array.isArray(taskList) &&
  //   taskList.filter((task) =>
  //     task.title.toLowerCase().includes(searchStr.toLowerCase())
  //   );

  const hasTask = () => taskList.length > 0;

  // const hasFilteredTask = () =>
  //   filteredTasks && Array.isArray(filteredTasks) && filteredTasks.length > 0;

  useEffect(() => {
    if (taskList.length === 0 && tasksFromRtk) {
      dispatch(setTasks(tasksFromRtk));
    }
  }, [taskList, tasksFromRtk, dispatch]);

  if (isLoading) return <div>Loading from rtk</div>;

  if (error && "status" in error) return <div>Error: {error?.status}</div>;

  if (!hasTask)
    return <Typography>No task yet. Add some tasks today!</Typography>;

  // if (!hasFilteredTask)
  //   return (
  //     <Typography fontStyle="italic">0 task found on "{searchStr}"</Typography>
  //   );

  // const taskListArray = searchStr.length === 0 ? taskList : filteredTasks;

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
            {taskList &&
              Array.isArray(taskList) &&
              taskList.map((task) => {
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
          {taskList.length} tasks found
        </Typography>
      </Suspense>
    </Container>
  );
};

export default TasksContainer;

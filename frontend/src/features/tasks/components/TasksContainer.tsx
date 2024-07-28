import { Box, Container, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { Task } from "../../../types/Tasks";
import { searchString, selectTasksList } from "../tasksSlice";
import TaskCard from "./TaskCard";

const TasksContainer = () => {
  const taskList: Task[] = useAppSelector(selectTasksList);

  const searchStr = useAppSelector(searchString);
  const filteredTasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchStr.toLowerCase())
  );

  const hasTask = () => taskList.length > 0;

  const hasFilteredTask = () => filteredTasks.length > 0;

  if (!hasTask)
    return <Typography>No task yet. Add some tasks today!</Typography>;

  if (!hasFilteredTask)
    return (
      <Typography fontStyle="italic">0 task found on "{searchStr}"</Typography>
    );

  const taskListArray = searchStr.length === 0 ? taskList : filteredTasks;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box height="70vh" overflow="auto">
        <Stack justifyContent="center" gap={2}>
          {taskList &&
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
    </Container>
  );
};

export default TasksContainer;

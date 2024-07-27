import { Container, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { Task } from "../../../types/Tasks";
import { selectList } from "../tasksSlice";
import TaskCard from "./TaskCard";

const TasksContainer = () => {
  const taskList: Task[] = useAppSelector(selectList);
  if (!taskList.length) return <Typography>No tasks yet. Add some tasks today!</Typography>;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Stack justifyContent="center" gap={2}>
        {taskList &&
          Array.isArray(taskList) &&
          taskList.map((task) => {
            return <TaskCard task={task} />;
          })}
      </Stack>
    </Container>
  );
};

export default TasksContainer;

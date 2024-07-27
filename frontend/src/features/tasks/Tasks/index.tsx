import { Button, Container, Typography } from "@mui/material";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { addTask } from "../tasksSlice";
import TasksContainer from "../components/TasksContainer";

const Tasks = () => {
  const dispatch = useAppDispatch();

  const handleClickAddTask = () => {
    dispatch(addTask());
  };

  return (
    <Container>
      <Typography textAlign="center" sx={{ my: 5 }}>
        Tasks Management
      </Typography>
      <Button variant="contained" sx={{ mb: 2 }} onClick={handleClickAddTask}>
        Add Task
      </Button>

      <TasksContainer />
    </Container>
  );
};

export default Tasks;

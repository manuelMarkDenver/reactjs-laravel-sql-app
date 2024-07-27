import { Button, Container, Typography } from "@mui/material";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { showModal } from "../tasksSlice";
import TasksContainer from "../components/TasksContainer";
import GlobalModal from "../../../components/GlobalModal";

const Tasks = () => {
  const dispatch = useAppDispatch();

  const handleClickAddTask = () => {
    dispatch(showModal());
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
      <GlobalModal />
    </Container>
  );
};

export default Tasks;

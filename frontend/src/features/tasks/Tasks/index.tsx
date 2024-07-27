import { Button, Container, Stack, Typography } from "@mui/material";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { showModal } from "../tasksSlice";
import TasksContainer from "../components/TasksContainer";
import GlobalModal from "../../../components/GlobalModal";
import SearchBar from '../components/SearchBar';

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
      <Stack direction="row" justifyContent="space-between" sx={{
        mb: 2
      }}>
        <Button variant="contained" sx={{ mb: 2 }} onClick={handleClickAddTask}>
          Add Task
        </Button>
        <SearchBar />
      </Stack>
      <TasksContainer />
      <GlobalModal />
    </Container>
  );
};

export default Tasks;

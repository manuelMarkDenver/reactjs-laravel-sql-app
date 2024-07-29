import { Button, Container, Grid } from "@mui/material";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { showModal } from "./tasksSlice";
import TasksContainer from "./components/TasksContainer";
import GlobalModal from "../../components/GlobalModal";
import SearchBar from "./components/SearchBar";
import { Suspense } from "react";
import LinearIndeterminate from "../../components/LinearLoader";

const Tasks = () => {
  const dispatch = useAppDispatch();

  const handleClickAddTask = () => {
    dispatch(showModal());
  };

  return (
    <Container>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleClickAddTask}
          >
            Add Task
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <SearchBar />
        </Grid>
      </Grid>
      <Suspense fallback={<LinearIndeterminate />}>
        <TasksContainer />
      </Suspense>
      <GlobalModal />
    </Container>
  );
};

export default Tasks;

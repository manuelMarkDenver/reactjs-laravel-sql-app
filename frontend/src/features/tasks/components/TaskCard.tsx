import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { Task } from "../../../types/Tasks";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import {
  deleteTask,
  completedUpdate,
  selectTask,
  showModal,
} from "../tasksSlice";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, description, isCompleted } = task;

  const dispatch = useAppDispatch();

  const handleClickEditTask = () => {
    dispatch(showModal());
    dispatch(selectTask(task));
  };

  const handleClickDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const handleOnchangeIsCompleted = () => {
    dispatch(completedUpdate(id));
  };

  return (
    <Card
      sx={{
        py: "10px",
        px: "5px",
        cursor: "pointer",
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {title}
          </Typography>
          <Checkbox
            checked={isCompleted}
            onChange={handleOnchangeIsCompleted}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>

        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            color: "gray",
          }}
        >
          {description && description.length > 0 ? description : ""}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleClickEditTask}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => {
            if (id) handleClickDeleteTask(id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Task } from "../../../types/Tasks";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { deleteTask } from "../tasksSlice";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, description, isCompleted } = task;

  const dispatch = useAppDispatch();

  const handleClickTaskDelete = (taskId: number) => {
    dispatch(deleteTask(taskId));
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
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {isCompleted ? "Completed" : "Not yet completed"}
          </Typography>
        </Stack>

        <Typography variant="body2">{isCompleted}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button size="small" variant="contained" color="primary">
          Edit
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => handleClickTaskDelete(id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;

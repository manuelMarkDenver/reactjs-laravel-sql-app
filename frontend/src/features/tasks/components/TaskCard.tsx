import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
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
import {
  useDeleteTaskMutation,
  useUpdateTaskStatusMutation,
} from "../services/apiSlice";
import { LoadingButton } from "@mui/lab";
import useGlobalToast from "../../../components/GlobalToast";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, description, isCompleted } = task;
  const dispatch = useAppDispatch();

  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation();
  const [updateTaskStatus, { isLoading: updateTaskLoading }] =
    useUpdateTaskStatusMutation();

  const handleClickEditTask = () => {
    dispatch(showModal());
    dispatch(selectTask(task));
  };

  const handleClickDeleteTask = (taskId: number) => {
    deleteTask(taskId)
      .then((fulfilled) => {
        useGlobalToast({
          type: "success",
          message: "Task deleted successfully",
        });
        console.log(fulfilled);
      })
      .catch((rejected) => {
        useGlobalToast({
          type: "error",
          message: rejected,
        });
        return console.error(rejected);
      });
  };

  const handleOnchangeIsCompleted = (id: any) => {
    console.log("🚀 ~ handleOnchangeIsCompleted ~ id:", id);
    // dispatch(completedUpdate(id));
    updateTaskStatus(id)
      .then((fulfilled) => {
        useGlobalToast({
          type: "success",
          message: "Task status updated successfully",
        });
        console.log(fulfilled);
      })
      .catch((rejected) => {
        useGlobalToast({
          type: "error",
          message: rejected,
        });
        return console.error(rejected);
      });
  };

  const isLoading = deleteLoading;

  const getDescription = (description: string) => {
    let string = "";

    const maxLength = 100;
    if (description.length > 100) {
      string = description.slice(0, maxLength) + "...";
    } else {
      string = description;
    }

    return string;
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
            onChange={() => handleOnchangeIsCompleted(id)}
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
          {description && description.length > 0
            ? getDescription(description)
            : ""}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <LoadingButton
          size="small"
          variant="contained"
          color="primary"
          onClick={handleClickEditTask}
          disabled={isLoading}
          loading={isLoading}
        >
          Edit
        </LoadingButton>
        <LoadingButton
          size="small"
          variant="outlined"
          color="error"
          onClick={() => id && handleClickDeleteTask(id)}
          disabled={isLoading}
          loading={isLoading}
        >
          Delete
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;

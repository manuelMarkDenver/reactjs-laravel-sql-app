import {
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTaskMutation,
  useGetSingleTaskQuery,
  useUpdateTaskStatusMutation,
} from "./services/apiSlice";
import { readableDate } from "../../helpers";
import globalToast from "../../components/GlobalToast";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { selectTask, showModal } from "./tasksSlice";

const Task = () => {
  const { taskId } = useParams<{ taskId?: string }>(); // `id` can be undefined
  const id = taskId ? Number(taskId) : undefined; // Convert to number if `id` is defined

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    data: task,
    error,
    isLoading: getSingleTaskLoading,
    isFetching,
  } = useGetSingleTaskQuery(id as number);
  console.log("🚀 ~ Task ~ isFetching:", isFetching);
  console.log("🚀 ~ Task ~ getSingleTaskLoading:", getSingleTaskLoading);

  const [updateTaskStatus, { isLoading: updateTaskLoading }] =
    useUpdateTaskStatusMutation();

  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation();

  const handleOnchangeIsCompleted = (id: any) => {
    updateTaskStatus(id)
      .then((fulfilled) => {
        globalToast({
          type: "success",
          message: "Task status updated successfully",
        });
        console.log(fulfilled);
      })
      .catch((rejected) => {
        globalToast({
          type: "error",
          message: rejected,
        });
        return console.error(rejected);
      });
  };

  const handleClickDeleteTask = (taskId: number) => {
    deleteTask(taskId)
      .then((fulfilled) => {
        globalToast({
          type: "success",
          message: "Task deleted successfully",
        });
        navigate("/");
        console.log(fulfilled);
      })
      .catch((rejected) => {
        globalToast({
          type: "error",
          message: rejected,
        });
        return console.error(rejected);
      });
  };

  const handleClickEditTask = () => {
    dispatch(showModal());
    dispatch(selectTask(task));
  };

  const isProcessLoading =
    deleteLoading || updateTaskLoading || getSingleTaskLoading || isFetching;
  console.log("xx", isProcessLoading);

  if (isProcessLoading)
    return (
      <Stack direction="row" gap={2}>
        <CircularProgress size={20} /> <Typography>Loading task...</Typography>
      </Stack>
    );
  if (error) return <div>Error occurred!</div>;
  if (!task) return <div>No task found.</div>;

  const { title, description, isCompleted, created_at, updated_at } = task;
  const booleanChecker = (value: boolean | number): boolean => {
    return value === true || value === 1;
  };

  return (
    <Card sx={{
      py: 2,
      px: 1
    }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1}>
            <Typography>ID: {id}</Typography>
            <Typography>Title: {title}</Typography>
            <Typography>Description: {description}</Typography>
            <Typography
              component="span"
            >
              Completed?:
            </Typography> {" "}
            <Typography
              component="span"
              color={booleanChecker(isCompleted) ? "green" : "red"}
            >
              {booleanChecker(isCompleted) ? "True" : "False"}
            </Typography>
            <Typography>Created at: {readableDate(created_at)}</Typography>
            <Typography>Updated at: {readableDate(updated_at)}</Typography>
          </Stack>
        </Stack>
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
          disabled={isProcessLoading}
          loading={isProcessLoading}
        >
          Edit
        </LoadingButton>
        <LoadingButton
          size="small"
          variant="outlined"
          color="error"
          onClick={() => id && handleClickDeleteTask(id)}
          disabled={isProcessLoading}
          loading={isProcessLoading}
        >
          Delete
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default Task;

import { useField, FormikProps, Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch } from "../hooks/reduxHooks";
import { toast } from "react-toastify";
import {
  addTask as dispatchAddTask,
  editTask,
  hideModal,
  resetTask,
} from "../features/tasks/tasksSlice";
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "../features/tasks/services/apiSlice";

import SaveIcon from "@mui/icons-material/Save";

import { Task } from "../types/Tasks";
import { LoadingButton } from "@mui/lab";
import useGlobalToast from "./GlobalToast";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().nullable().optional(),
});

type FormValues = Omit<Task, "id">;

const FormTextField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  if (field?.checked) {
    return;
  }

  return (
    <TextField
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

const FormCheckBox = ({ ...props }: any) => {
  const [field, meta, helpers] = useField(props);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography>Completed</Typography>
      <Checkbox {...field} checked={value} onChange={() => setValue(!value)} />
    </Stack>
  );
};

const initialValues: Omit<Task, "id"> = {
  title: "",
  description: "",
  isCompleted: false,
};

type FormProps = {
  task: Task | null;
  onClose: () => void;
};

const Form = ({ task, onClose }: FormProps) => {
  const [addTask, { isLoading: addLoading, error: addError }] =
    useAddTaskMutation();
  const [updateTask, { isLoading: updateLoading, error: updateError }] =
    useUpdateTaskMutation();
  const dispatch = useAppDispatch();

  const isLoading = addLoading || updateLoading;

  return (
    <Formik
      initialValues={task ? task : initialValues}
      onSubmit={async (values) => {
        if (task) {
          // dispatch(editTask({ ...values }));
          updateTask(values)
            .then((fulfilled) => {
              useGlobalToast({
                type: "success",
                message: "Task Updated successfully",
              });
              console.log(fulfilled);
            })
            .catch((rejected) => {
              useGlobalToast({
                type: "error",
                message: rejected,
              });
              return console.error(rejected);
            })
            .finally(() => {
              dispatch(hideModal());
              dispatch(resetTask());
            });
        } else {
          try {
            await addTask(values)
              .unwrap()
              .then((fulfilled) => {
                useGlobalToast({
                  type: "success",
                  message: "Task added successfully",
                });
                console.log(fulfilled);
              })
              .catch((rejected) => {
                useGlobalToast({
                  type: "error",
                  message: rejected,
                });
                return console.error(rejected);
              })
              .finally(() => {
                dispatch(hideModal());
                dispatch(resetTask());
              });
            // dispatch(dispatchAddTask(newTask?.data));
          } catch (err) {
            console.error(err);
          }
          // dispatch(addTask(values));
        }
      }}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(props: FormikProps<FormValues>) => {
        return (
          <Box
            component="form"
            onSubmit={props.handleSubmit}
            sx={{
              height: "auto",
            }}
          >
            <Stack gap={2} sx={{ width: "500px", my: 2 }}>
              <FormTextField name="title" type="text" label="Title" />
              <FormTextField
                name="description"
                type="text"
                label="Description"
              />
              <FormCheckBox
                name="isCompleted"
                type="checkbox"
                label="Completed"
              />
              <Stack direction="row" gap={1} justifyContent="flex-end">
                <LoadingButton
                  autoFocus
                  loading={isLoading}
                  loadingPosition="start"
                  // startIcon={<SaveIcon />}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </LoadingButton>
                <LoadingButton
                  autoFocus
                  loading={isLoading}
                  loadingPosition="start"
                  variant="outlined"
                  onClick={onClose}
                >
                  Cancel
                </LoadingButton>
              </Stack>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Form;

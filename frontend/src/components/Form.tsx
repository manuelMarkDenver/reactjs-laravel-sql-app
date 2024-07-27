import { useField, FormikProps, Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Task } from "../types/Tasks";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  addTask,
  editTask,
  hideModal,
  resetTask,
  selectTasksList,
} from "../features/tasks/tasksSlice";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
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

const FormCheckBox = ({ ...props }) => {
  const [field, meta, helpers] = useField<any>(props);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography>Completed</Typography>
      <Checkbox checked={value} onChange={() => setValue(!value)} />
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
  const tasksList = useAppSelector(selectTasksList);
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={task ? task : initialValues}
      onSubmit={(values) => {
        if (task) {
          dispatch(editTask({ ...values }));
        } else {
          dispatch(addTask({ id: tasksList.length + 1, ...values }));
        }
        dispatch(hideModal());
        dispatch(resetTask());
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
                <Button autoFocus variant="contained" type="submit">
                  Submit
                </Button>
                <Button autoFocus onClick={onClose} variant="outlined">
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
};

export default Form;

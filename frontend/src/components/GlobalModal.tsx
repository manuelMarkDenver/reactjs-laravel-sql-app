import { Box, DialogTitle, DialogContent, Dialog } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  hideModal,
  modalState,
  resetTask,
  selectedTask,
} from "../features/tasks/tasksSlice";
import Form from "./Form";

const GlobalModal = () => {
  const dispatch = useAppDispatch();

  const task = useAppSelector(selectedTask);
  const openModal = useAppSelector(modalState);

  const handleClose = () => {
    dispatch(hideModal());
    dispatch(resetTask());
  };

  return (
    <Box>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {task ? `Edit "${task?.title}" Task` : "Add Task"}
        </DialogTitle>
        <DialogContent>
          <Form onClose={handleClose} task={task} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GlobalModal;

import {
  Box,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  hideModal,
  modalState,
  resetTask,
  selectTask,
} from "../features/tasks/tasksSlice";

const GlobalModal = () => {
  const dispatch = useAppDispatch();

  const task = useAppSelector(selectTask);

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
          {task ? "Edit" : "Add"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {JSON.stringify(task)}
            <br />
            <br />
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GlobalModal;

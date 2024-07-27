import { Stack, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { searchString, searchTask } from "../tasksSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const searchStr = useAppSelector(searchString);

  const dispatch = useDispatch();

  const handleSearchStringOnChange = (e) => {
    dispatch(searchTask(e.target.value));
  };

  return (
    <Stack gap={2} direction="row" alignItems="center">
      <Typography>Search a task:</Typography>
      <TextField value={searchStr} onChange={handleSearchStringOnChange} />
    </Stack>
  );
};

export default SearchBar;

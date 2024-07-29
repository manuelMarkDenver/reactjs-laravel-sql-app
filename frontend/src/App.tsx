import { Outlet, useLocation } from "react-router-dom";
import Tasks from "./features/tasks/Tasks";
import { Grid, Typography } from "@mui/material";
import DefaultMessage from "./components/DefaultMessage";

function App() {
  const location = useLocation();

  // Check if the current path contains an ID
  const isDetailView = location.pathname.includes("/tasks/");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          sx={{ py: 10 }}
        >
          Tasks Management
        </Typography>
      </Grid>
      <Grid item xs={8} md={6}>
        <Tasks />
      </Grid>
      <Grid item xs={4} md={6}>
        {isDetailView ? <Outlet /> : <DefaultMessage />}
      </Grid>
    </Grid>
  );
}

export default App;

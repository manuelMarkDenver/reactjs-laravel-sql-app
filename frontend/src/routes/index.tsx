import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Task from "../features/tasks/Task";
import ErrorPage from "../components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "tasks/:taskId",
        element: <Task />,
      },
    ],
  },
]);

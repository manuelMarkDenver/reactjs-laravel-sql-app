import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Task } from "../../../types/Tasks";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { id, title, description, isCompleted } = task;

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
    <Link
      to={`/tasks/${id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card
        sx={{
          py: "10px",
          px: "5px",
          cursor: "pointer",
        }}
      >
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography
              sx={{
                fontSize: "18px",
                mb: 1.5,
                textDecoration: isCompleted ? "line-through" : "unset",
              }}
              color="text.secondary"
              fontWeight="bold"
            >
              {title}
            </Typography>
            {isCompleted ? (
              <Stack direction="row" gap={1}>
                <Typography>Completed</Typography>
                <CheckCircleIcon color="success" />
              </Stack>
            ) : null}
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
              : "No description"}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TaskCard;

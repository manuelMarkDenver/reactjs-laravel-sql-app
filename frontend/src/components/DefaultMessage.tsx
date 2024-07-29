import { Container, Typography } from "@mui/material";

const DefaultMessage = () => {
  return (
    <Container
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography>Click a task to view details</Typography>
    </Container>
  );
};

export default DefaultMessage;

import { Box, CircularProgress } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;

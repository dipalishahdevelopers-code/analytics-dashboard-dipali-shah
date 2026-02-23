"use client";

import React, { useEffect } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        p: 3,
      }}
    >
      <Paper
        sx={{
          p: 5,
          textAlign: "center",
          maxWidth: 600,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <ErrorIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Something went wrong!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4, fontSize: "1.1rem" }}>
          We encounterd an unexpected error while loading this page. Our team
          has been notified.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={() => reset()}
            sx={{ px: 4 }}
          >
            Try again
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => (window.location.href = "/")}
            sx={{ px: 4 }}
          >
            Go to Home
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

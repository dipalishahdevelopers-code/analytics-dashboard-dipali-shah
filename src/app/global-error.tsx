"use client";

import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              textAlign: "center",
            }}
          >
            <Typography variant="h2" color="error" gutterBottom>
              Critical System Error
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
              A critical error occurred that prevented the application from
              starting.
            </Typography>
            <Button variant="contained" color="primary" onClick={() => reset()}>
              Restart Application
            </Button>
          </Box>
        </Container>
      </body>
    </html>
  );
}

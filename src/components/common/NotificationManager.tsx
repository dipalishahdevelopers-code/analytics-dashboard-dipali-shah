"use client";

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { hideNotification } from "@/store/slices/notificationSlice";

const NotificationManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector(
    (state) => state.notification,
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationManager;

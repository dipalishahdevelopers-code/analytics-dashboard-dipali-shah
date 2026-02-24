"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { LoginUser } from "@/store/actions/authenticationAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUserState } from "@/store/types/authentication";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f4f6f8" },
  },
});

const LoginPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const LoginSchema = Yup.object({
    vEmail: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    vPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { vEmail: "", vPassword: "" },
    validationSchema: LoginSchema,
    onSubmit: async (values: IUserState) => {
      //   dispatch(setLoading(true));
      const result = await dispatch(LoginUser(values));

      if (LoginUser.fulfilled.match(result)) {
        alert("Success");
        // dispatch(setLoading(false));
        router.push("/dashboard");
      } else {
        alert("Failed");
        // dispatch(setLoading(false));
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <Container maxWidth="xs">
          <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h5"
                sx={{ mb: 1, fontWeight: "bold", textAlign: "center" }}
              >
                Welcome Back
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ mb: 4, textAlign: "center" }}
              >
                Login to access your dashboard
              </Typography>

              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  name="vEmail"
                  type="email"
                  value={formik.values.vEmail || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.vEmail && !!formik.errors.vEmail}
                  helperText={formik.touched.vEmail && formik.errors.vEmail}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="vPassword"
                  variant="outlined"
                  value={formik.values.vPassword || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.vPassword && !!formik.errors.vPassword}
                  helperText={
                    formik.touched.vPassword && formik.errors.vPassword
                  }
                  sx={{ mb: 3 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  size="large"
                  sx={{ py: 1.5, fontWeight: "bold" }}
                >
                  Sign In
                </Button>
              </form>

              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  Testing vRoles? Use <b>admin@mail.com</b> for Admin access
                  or&nbsp;
                  <b>user1@mail.com</b> for standard access & password is &nbsp;
                  <b>Demo@123</b> .
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LoginPage;

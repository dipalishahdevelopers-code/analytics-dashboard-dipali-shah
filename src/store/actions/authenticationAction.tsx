import AxiosWrapper from "@/lib/axios/AxiosWrapper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ILoginResponseState, IUserState } from "../types/authentication";

export const LoginUser = createAsyncThunk(
  "/api/login",
  async (data: IUserState, { rejectWithValue }) => {
    try {
      const response = await AxiosWrapper.post<ILoginResponseState>(
        "/api/login",
        data,
      );

      if (response.data.success) {
        localStorage.setItem("USER_DATA", JSON.stringify(response.data.data));
      }
      return response.data; // Return the response data on success
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Failed to fetch data");
      }
      return rejectWithValue("Failed to fetch data");
    }
  },
);

export const LogoutsUser = createAsyncThunk(
  "/api/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await AxiosWrapper.post<ILoginResponseState>("/api/logout");

      return response.data; // Return the response data on success
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Failed to fetch data");
      }
      return rejectWithValue("Failed to fetch data");
    }
  },
);

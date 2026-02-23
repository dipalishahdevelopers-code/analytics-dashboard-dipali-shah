import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosWrapper from "@/lib/axios/AxiosWrapper";
import { AxiosError } from "axios";
import { DashboardState } from "../types/dashboard";

export const getDashboardDataByUser = createAsyncThunk(
  "dashboard/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosWrapper.post("/api/getDashboardDataByUser");
      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data || "Failed to fetch dashboard data",
        );
      }
      return rejectWithValue(
        error?.message || "Failed to fetch dashboard data",
      );
    }
  },
);

export const getUsersData = createAsyncThunk(
  "dashboard/getUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { dashboard } = getState() as { dashboard: DashboardState };
      const { page, pageSize, search, sortBy, sortDir } = dashboard.users;

      const response = await AxiosWrapper.get("/api/users", {
        params: { page, pageSize, search, sortBy, sortDir },
      });

      return response.data;
    } catch (error: any) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Failed to fetch users");
      }
      return rejectWithValue(error?.message || "Failed to fetch users");
    }
  },
);

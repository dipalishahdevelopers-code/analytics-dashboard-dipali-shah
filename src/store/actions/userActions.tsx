import AxiosWrapper from "@/lib/axios/AxiosWrapper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { IUserResponseState } from "../types/user";

export const GetUser = createAsyncThunk(
  "api/getUserData",
  async (
    params: {
      search?: string;
      sortBy?: string;
      sortDir?: "asc" | "desc";
      page?: number;
      pageSize?: number;
    } = {},
    { rejectWithValue },
  ) => {
    try {
      const {
        search = "",
        sortBy = "",
        sortDir = "asc",
        page = 0,
        pageSize = 10,
      } = params;
      const queryParams = new URLSearchParams({
        search,
        sortBy,
        sortDir,
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      const response = await AxiosWrapper.get<IUserResponseState>(
        `/api/getUserData?${queryParams.toString()}`,
      );

      return response.data; // Return the response data on success
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Failed to fetch data");
      }
      return rejectWithValue("Failed to fetch data");
    }
  },
);

export const GetUserDetail = createAsyncThunk(
  "api/getUserDetail",
  async (_, { rejectWithValue }) => {
    try {
      const response =
        await AxiosWrapper.get<IUserResponseState>("/api/getUserDetail");

      return response.data; // Return the response data on success
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || "Failed to fetch data");
      }
      return rejectWithValue("Failed to fetch data");
    }
  },
);

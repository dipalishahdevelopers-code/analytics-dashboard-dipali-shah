import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getUsersData,
  getDashboardDataByUser,
} from "@/store/actions/dashboardAction";
import { DashboardState } from "../types/dashboard";

const initialState: DashboardState = {
  sales: [],
  revenue: [],
  users: {
    data: [],
    total: 0,
    loading: false,
    page: 0,
    pageSize: 10,
    search: "",
    sortBy: "",
    sortDir: "asc",
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setUsersPage: (state, action: PayloadAction<number>) => {
      state.users.page = action.payload;
    },
    setUsersSearch: (state, action: PayloadAction<string>) => {
      state.users.search = action.payload;
      state.users.page = 0; // Reset to first page on search
    },
    setUsersSort: (
      state,
      action: PayloadAction<{ sortBy: string; sortDir: "asc" | "desc" }>,
    ) => {
      state.users.sortBy = action.payload.sortBy;
      state.users.sortDir = action.payload.sortDir;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.data = action.payload.data;
        state.users.total = action.payload.total;
      })
      .addCase(getDashboardDataByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardDataByUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.sales = action.payload.data?.SALES_DATA_BY_USER || [];
        state.revenue = action.payload.data?.REVENUE_DATA_BY_USER || [];
      })
      .addCase(getDashboardDataByUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch dashboard data";
      });
  },
});

export const { setUsersPage, setUsersSearch, setUsersSort } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;

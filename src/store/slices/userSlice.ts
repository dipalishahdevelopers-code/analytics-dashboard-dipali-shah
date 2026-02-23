import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUserResponseState, IUserState } from "../types/user";
import { GetUserDetail, GetUser } from "../actions/userActions";

const initialState: IAuthState = {
  loading: false,
  error: "",
  user: null,
  vRole: null,
  users: null,
  total: 0,
  page: 0,
  pageSize: 10,
  search: "",
  sortBy: "",
  sortDir: "asc",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogout: (state) => {
      state.user = null;
      state.vRole = null;
    },
    setUsersPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setUsersSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.page = 0; // Reset to first page on search
    },
    setUsersSort: (
      state,
      action: PayloadAction<{ sortBy: string; sortDir: "asc" | "desc" }>,
    ) => {
      state.sortBy = action.payload.sortBy;
      state.sortDir = action.payload.sortDir;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetUser.fulfilled,
        (state, action: PayloadAction<IUserResponseState>) => {
          state.loading = false;
          // For GetUser (which fetches user list now with params)
          if (Array.isArray(action.payload.data)) {
            state.users = action.payload.data;
            state.total = action.payload.total || action.payload.data.length;
          } else if (action.payload.data) {
            state.users = [action.payload.data];
            state.total = 1;
          } else {
            state.users = [];
            state.total = 0;
          }
        },
      )
      .addCase(GetUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        GetUserDetail.fulfilled,
        (state, action: PayloadAction<IUserResponseState>) => {
          state.loading = false;
          if (!Array.isArray(action.payload.data) && action.payload.data) {
            state.user = action.payload.data;
            state.vRole = action.payload.data.vRole || "admin";
          } else {
            state.user = null;
            state.vRole = null;
          }
        },
      )
      .addCase(GetUserDetail.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user details";
      });
  },
});

export const { setLogout, setUsersPage, setUsersSearch, setUsersSort } =
  userSlice.actions;
export default userSlice.reducer;

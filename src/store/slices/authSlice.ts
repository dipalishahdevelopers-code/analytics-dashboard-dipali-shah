import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState } from "../types/authentication";
import { LoginUser } from "../actions/authenticationAction";

const initialState: IAuthState = {
  isAuthenticated: false,
  loading: false,
  error: "",
  user: null,
  vRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.vRole = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginUser.fulfilled, (state, action: any) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data?.user;
        state.vRole = action.payload.data?.user?.vRole;
      });
  },
});

export const { setIsAuthenticated, setLogout } = authSlice.actions;
export default authSlice.reducer;

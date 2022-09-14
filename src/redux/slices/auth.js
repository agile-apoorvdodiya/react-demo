import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login: (s, action) => {
      console.log(' ======== ', action);
      localStorage.setItem("user", action.user);
      localStorage.setItem("token", action.token);
      s.token = action.payload.user?.token;
      s.user = action.payload.user;
    },
    logout: (s) => {
      s.token = null;
    },
    setUser: (s, action) => {
      s.token = action.payload.user?.token;
      s.user = action.payload.user;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;

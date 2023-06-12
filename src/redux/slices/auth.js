import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login: (s, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.data));
      localStorage.setItem("token", action.payload?.data?.token);
      s.token = action.payload.data?.token;
      s.user = action.payload.data;
    },
    logout: (s) => {
      s.token = null;
      s.user = null;
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    setUser: (s, action) => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");
      s.token = token;
      s.user = user;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;

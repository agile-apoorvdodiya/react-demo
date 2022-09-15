import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login: (s, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload?.user?.token);
      s.token = action.payload.user?.token;
      s.user = action.payload.user;
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

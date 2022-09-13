import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userDetails: null,
    isLoggedIn: false
  },
  reducers: {
    login: s => {
      s.isLoggedIn = true;
    },
    logout: s => {
      s.isLoggedIn = false;
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
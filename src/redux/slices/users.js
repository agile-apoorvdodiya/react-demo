import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
    userDetails: {},
    success: {},
  },
  reducers: {
    usersList: (s, action) => {
      s.userList = action.payload.data;
    },
    usersDetails: (s, action) => {
      s.userDetails = action.payload.data;
    },
    success: (s, action) => {
      s.success = action.payload.data;
    },
  },
});

export const { usersList, usersDetails, success } = userSlice.actions;

export default userSlice.reducer;

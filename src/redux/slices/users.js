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
      s.userList = action.payload.users;
    },
    usersDetails: (s, action) => {
      s.userDetails = action.payload.user;
    },
    success: (s, action) => {
      s.success = action.payload.user;
    },
  },
});

export const { usersList, usersDetails, success } = userSlice.actions;

export default userSlice.reducer;

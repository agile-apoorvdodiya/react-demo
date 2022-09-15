import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    userList: [],
  },
  reducers: {
    usersList: (s, action) => {
      console.log(action);
      s.userList = action.payload.users;
    },
  },
});

export const { usersList } = userSlice.actions;

export default userSlice.reducer;
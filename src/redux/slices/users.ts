import { createSlice } from "@reduxjs/toolkit";
import { IAPIState } from "../../interfaces/api";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    success: null,
  },
  reducers: {
    userList: (s, payload: any) => {
      console.log('user response', payload)
      s.userList = payload?.payload?.data?.data;
    },
    success: (s, payload: any) => {
      console.log('user response', payload)
      s.success = payload?.payload?.data;
    },
  },
});

export const { userList, success } = userSlice.actions;
export default userSlice.reducer;

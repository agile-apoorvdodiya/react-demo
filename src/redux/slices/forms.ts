import { createSlice } from "@reduxjs/toolkit";
import { IAPIState } from "../../interfaces/api";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formList: [],
    success: null,
  },
  reducers: {
    formList: (s, payload: any) => {
      console.log('form response', payload)
      s.formList = payload?.payload?.data?.data;
    },
    success: (s, payload: any) => {
      console.log('form response', payload)
      s.success = payload?.payload?.data;
    },
  },
});

export const { formList, success } = formSlice.actions;
export default formSlice.reducer;

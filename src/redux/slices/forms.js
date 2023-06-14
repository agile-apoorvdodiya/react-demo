import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "forms",
  initialState: {
    formList: [],
    formDetails: {},
    success: {},
  },
  reducers: {
    formsList: (s, action) => {
      s.formList = action.payload.data;
    },
    formDetails: (s, action) => {
      s.formDetails = action.payload.data;
    },
    success: (s, action) => {
      s.success = action.payload.data;
    },
  },
});

export const { formsList, formDetails, success } = formSlice.actions;

export default formSlice.reducer;

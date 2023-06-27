import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    isDarkMode: true,
  },
  reducers: {
    setDarkMode: (s, action) => {
      s.isDarkMode = action.payload.isDarkMode;
    },
  },
});

export const { setDarkMode } = commonSlice.actions;
export default commonSlice.reducer;
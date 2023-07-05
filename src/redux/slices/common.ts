import { createSlice } from "@reduxjs/toolkit";

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    isDarkMode: true,
    snackBar: {
      open: false,
      message: "testing it ",
      timeout: true,
    },
  },
  reducers: {
    setDarkMode: (s, action) => {
      s.isDarkMode = action.payload.isDarkMode;
    },
    setSnackBar: (s, action) => {
      console.log('updating snackbar ', action.payload)
      s.snackBar = {
        ...s.snackBar,
        ...action.payload
      }
    }
  },
});

export const { setDarkMode, setSnackBar } = commonSlice.actions;
export default commonSlice.reducer;
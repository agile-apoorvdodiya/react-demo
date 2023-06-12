import { createSlice } from "@reduxjs/toolkit";

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    payload: undefined,
    loading: undefined,
    response: undefined,
    error: undefined,
    fileUploadProgress: 0
  },
  reducers: {
    request: (s, p) => {
      s.loading = true;
    },
    success: (s, p) => {
      s.loading = false;
      s.response = p;
    },
    error: (s, p) => {
      s.loading = false;
      s.error = p;
    },
    fileProgress: (s, action) => {
      console.log(' file progress action ', action)
      s.fileUploadProgress = action.payload.progress;
    },
  }
})

export const { request, success, error, fileProgress } = apiSlice.actions;
export default apiSlice.reducer;
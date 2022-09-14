import { createSlice } from "@reduxjs/toolkit";

export const apiSlice = createSlice({
  name: 'api',
  initialState: {
    payload: undefined,
    loading: undefined,
    response: undefined,
    error: undefined,
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
  }
})

export const { request, success, error } = apiSlice.actions;
export default apiSlice.reducer;
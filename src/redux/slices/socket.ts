import { createSlice } from "@reduxjs/toolkit";

const sockerSlice = createSlice({
  name: "socket",
  initialState: {
    status: "disconnected",
  },
  reducers: {
    setStatus: (s, action) => {
      s.status = action.payload.status;
    },
  },
});

export const { setStatus } = sockerSlice.actions;
export default sockerSlice.reducer;

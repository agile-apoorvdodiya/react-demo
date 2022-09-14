import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./slices/auth";
import { apiMiddleware } from "./middleware/api";
export default configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [thunk, apiMiddleware]
});
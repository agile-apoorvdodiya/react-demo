import { configureStore } from "@reduxjs/toolkit";
import { apiMiddleware } from "../middleware/api";
import thunk from "redux-thunk";
import apiReducer from "./slices/api";
import authReducer from "./slices/auth";
import commonReducer from "./slices/common";
import socketReducer from "./slices/socket";
import usersReducer from "./slices/users";

export default configureStore({
  reducer: {
    api: apiReducer,
    auth: authReducer,
    common: commonReducer,
    socket: socketReducer,
    user: usersReducer,
  },
  middleware: [thunk, apiMiddleware],
});

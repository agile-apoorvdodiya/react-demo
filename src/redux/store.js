import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./slices/auth";
import usersReducer from "./slices/users";
import { apiMiddleware } from "./middleware/api";
export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
  middleware: [thunk, apiMiddleware],
});

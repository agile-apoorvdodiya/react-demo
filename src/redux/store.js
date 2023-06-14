import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import authReducer from "./slices/auth";
import usersReducer from "./slices/users";
import formsReducer from "./slices/forms";
import { apiMiddleware } from "./middleware/api";
export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    forms: formsReducer,
  },
  middleware: [thunk, apiMiddleware],
});

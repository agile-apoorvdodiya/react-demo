import { API, USER_URL } from "../constants/api";
import { login } from "../slices/auth";

export const doLogin = (data) => ({
  type: API,
  payload: {
    url: `${USER_URL}/login`,
    data,
    method: 'POST',
    success: login
  },
});

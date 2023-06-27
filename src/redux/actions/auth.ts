import { AnyAction } from "redux";
import { IUserLogin } from "../../interfaces/user";
import { API, USER_URL, POST } from "../api-constant";
import { login } from "../slices/auth";

export const doLogin = (data: IUserLogin) => ({
  type: API,
  payload: {
    url: `${USER_URL}/login`,
    data,
    method: POST,
    success: login,
  },
});

export const dummyLogin = (data: any) => login(data);

export const attemptLogin = (data: IUserLogin): AnyAction => ({
  type: API,
  payload: {
    url: `${USER_URL}/login`,
    method: POST,
    success: login,
    data,
  },
});

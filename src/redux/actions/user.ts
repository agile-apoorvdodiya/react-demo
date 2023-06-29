import { AnyAction } from "redux";
import { IUserLogin } from "../../interfaces/user";
import { API, USER_URL, POST, GET, PUT, DELETE } from "../api-constant";
import { login } from "../slices/auth";
import { success, userList } from "../slices/users";

export const doLogin = (data: IUserLogin) => ({
  type: API,
  payload: {
    url: `${USER_URL}/login`,
    data,
    method: POST,
    success: login,
  },
});

export const getUserList = (data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${USER_URL}`,
    method: GET,
    success: userList,
    data,
  },
});

export const createUser = (data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${USER_URL}`,
    method: POST,
    success: success,
    data,
  },
});

export const getUserById = (id: string, data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${USER_URL}/${id}`,
    method: GET,
    success: success,
    data,
  },
});

export const putUser = (id: string, data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${USER_URL}/${id}`,
    method: PUT,
    success: success,
    data,
  },
});

export const deleteUser = (id: string, data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${USER_URL}/${id}`,
    method: DELETE,
    success: success,
    data,
  },
});


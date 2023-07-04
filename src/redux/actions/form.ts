import { AnyAction } from "redux";
import { API, FORM_URL, POST, GET, PUT, DELETE } from "../api-constant";
import { login } from "../slices/auth";
import { success, formList } from "../slices/forms";

export const getFormsList = (data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${FORM_URL}`,
    method: GET,
    success: formList,
    data,
  },
});

export const createForm = (data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${FORM_URL}`,
    method: POST,
    success: success,
    data,
  },
});

export const getFormById = (id: string, data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${FORM_URL}/${id}`,
    method: GET,
    success: success,
    data,
  },
});

export const putForm = (id: string, data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${FORM_URL}/${id}`,
    method: PUT,
    success: success,
    data,
  },
});

export const deleteForm = (id: string, data: any = {}): AnyAction => ({
  type: API,
  payload: {
    url: `${FORM_URL}/${id}`,
    method: DELETE,
    success: success,
    data,
  },
});


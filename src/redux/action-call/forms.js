import { success, formDetails, formsList } from "../slices/forms";
import { API, GET, POST, PUT, FORM_URL, DELETE } from "../constants/api";

export const getFormsList = (data = {}) => ({
  type: API,
  payload: {
    url: `${FORM_URL}`,
    data,
    method: GET,
    success: formsList,
  },
});

export const getSingleForm = (id, data) => ({
  type: API,
  payload: {
    url: `${FORM_URL}/${id}`,
    data,
    method: GET,
    success: formDetails,
  },
});

export const putFormDetails = (id, data) => ({
  type: API,
  payload: {
    url: `${FORM_URL}/${id}`,
    data,
    method: PUT,
    success: success,
  },
});

export const postFormDetails = (data) => ({
  type: API,
  payload: {
    url: `${FORM_URL}`,
    data,
    method: POST,
    success: success,
  },
});

export const deleteForm = (id, data = {}) => ({
  type: API,
  payload: {
    url: `${FORM_URL}/${id}`,
    data,
    method: DELETE,
    success: success,
  },
});

export const submitForm = (data = {}) => ({
  type: API,
  payload: {
    url: `${FORM_URL}/submit`,
    data,
    method: POST,
    success: success,
  },
});

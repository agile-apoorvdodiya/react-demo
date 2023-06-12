import { success, usersDetails, usersList } from "../slices/users";
import { API, GET, POST, PUT, USER_URL, FILE_UPLOAD_URL } from "../constants/api";

export const getUsersList = (data) => ({
  type: API,
  payload: {
    url: `${USER_URL}`,
    data,
    method: GET,
    success: usersList,
  },
});

export const getUsersDetails = (id, data) => ({
  type: API,
  payload: {
    url: `${USER_URL}/${id}`,
    data,
    method: GET,
    success: usersDetails,
  },
});

export const putUsersDetails = (id, data) => ({
  type: API,
  payload: {
    url: `${USER_URL}/${id}`,
    data,
    method: PUT,
    success: success,
  },
});

export const postUsersDetails = (data) => ({
  type: API,
  payload: {
    url: `${USER_URL}`,
    data,
    method: POST,
    success: success,
  },
});

export const postUsersDocument = (data, id) => {
  console.log(data)
  return ({
    type: API,
    payload: {
      url: `${USER_URL}/upload/${id}`,
      apiUrl: FILE_UPLOAD_URL,
      data,
      method: POST,
      success: success,
    },
  })
};

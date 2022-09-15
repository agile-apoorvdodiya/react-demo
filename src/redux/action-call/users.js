import { usersList } from "../slices/users";
import { API, USER_URL } from "../constants/api";

export const getUsersList = (data) => ({
  type: API,
  payload: {
    url: `${USER_URL}`,
    data,
    method: "GET",
    success: usersList,
  },
});

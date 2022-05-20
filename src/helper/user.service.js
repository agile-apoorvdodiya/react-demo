import { post, get, put, httpDelete } from "./httpHelper";
import config from './config'

export const getAllUsers = () => {
  return get(`${config.apiURL}/users`);
}

export const getUserById = (id) => {
  return get(`${config.apiURL}/users/${id}`);
}

export const createUser = (payload) => {
  return post(`${config.apiURL}/users`, payload);
}

export const updateUserById = (id, payload) => {
  return put(`${config.apiURL}/users/${id}`, payload);
}

export const deleteUserById = (id) => {
  return httpDelete(`${config.apiURL}/users/${id}`);
}
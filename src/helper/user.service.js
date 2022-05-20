import { post, get } from "./httpHelper";
import config from './config'

export const getAllUsers = () => {
  return get(`${config.apiURL}/users`);
}
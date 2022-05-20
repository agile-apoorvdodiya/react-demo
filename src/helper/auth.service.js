import { post } from "./httpHelper";
import config from './config'

export const isUserLoggedIn = async () => {
  return localStorage.getItem('u');
}

export const login = (payload) => {
  return post(`${config.apiURL}/users/login`, payload).then(res => {
    localStorage.setItem('u', JSON.stringify(res.data.user));
    return res;
  });
}
import { post } from "./httpHelper";

const apiURL = 'http://localhost:3000';
const uploadURL = 'http://localhost:3001';

export const isUserLoggedIn = async () => {
  return localStorage.getItem('u');
}

export const login = (payload) => {
  return post(`${apiURL}/users/login`, payload).then(res => {
    localStorage.setItem('u', JSON.stringify(res.data));
    return res;
  });
}
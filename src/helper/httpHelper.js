import axios from "axios";

const getToken = () => {
  const userData = localStorage.getItem('u')
  return userData && JSON.parse(userData).token;
}

export const post = (url, payload, headers = {}) => {
  return axios.post(url, payload, {
    headers: {
      authorization: getToken(),
      ...headers
    }
  }).catch(err => {
    if (err.response) {
      if (err.response?.data?.message) {
        throw { message: err.response?.data?.message }
      }
      throw err.response
    }
    throw err
  })
}

export const get = (url, headers = {}) => {
  console.log('token', getToken());
  return axios.get(url, {
    headers: {
      authorization: `Bearer ${getToken()}`,
      ...headers
    }
  }).catch(err => {
    if (err.response) {
      if (err.response?.data?.message) {
        throw { message: err.response?.data?.message }
      }
      throw err.response
    }
    throw err
  })
}
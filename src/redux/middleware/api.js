import { login } from "../slices/auth";
import { API } from "../constants/api";
import axios from "axios";
import {
  error as apiError,
  success as apiSuccess,
  fileProgress,
} from "../slices/api";
export const apiMiddleware = (store) => (next) => (action) => {
  next(action);
  const { type, payload } = action;

  if (type === API) {
    const { method, url, data, params, success, apiUrl } = payload;

    return axios({
      method,
      data,
      url,
      params,
      baseURL: apiUrl || "http://localhost:3001/",
      onUploadProgress: (progress) => {
        try {
          store.dispatch(fileProgress({ progress: progress.loaded / progress.total }));
        } catch (error) {
        }
      },
    })
      .then((res) => {
        store.dispatch(apiSuccess(res));
        store.dispatch(success(res.data));

        return Promise.resolve(res.data);
      })
      .catch((err) => {
        store.dispatch(apiError());
        return Promise.reject(err?.response?.data || err?.response || err);
      });
  }
};

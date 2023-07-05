import { IAction, INextFunction, IStore } from "../interfaces/common";
import { API, DELETE, POST, PUT } from "../redux/api-constant";
import axios from "axios";
import { Middleware } from "redux";
import { IRootState } from "../interfaces/api";
import { apiError, apiSuccess } from "../redux/slices/api";
import { setSnackBar } from "../redux/slices/common";
export const apiMiddleware: Middleware<{}, any> =
  (store) => (next) => (action) => {
    next(action);

    if (action.type === API) {
      const {
        method,
        url,
        data,
        params,
        success: onSuccess,
        error: onError,
      } = action.payload;

      return new Promise((resolve, reject) => {
        axios({
          url,
          method,
          data,
          params,
          baseURL: process.env.REACT_APP_USER_MGMT_URL,
        })
          .then((res) => {
            store.dispatch(apiSuccess(res));
            onSuccess && store.dispatch(onSuccess(res));
            console.log(res?.data?.message);
            if ([POST, PUT, DELETE].includes(method))
              store.dispatch(
                setSnackBar({
                  open: true,
                  timeout: true,
                  message: res?.data?.message,
                })
              );
            resolve(res);
          })
          .catch((error) => {
            store.dispatch(apiError(error));
            onError && store.dispatch(onError(error));
            console.log(error)
            store.dispatch(
              setSnackBar({
                open: true,
                timeout: true,
                message: error?.response?.data?.message || 'Something went wrong! Please try again later.',
              })
            );
            reject(error);
          });
      });
    }
  };

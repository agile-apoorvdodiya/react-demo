import axios from "axios";
import store from "../redux/store";

export const useInterceptors = () => {
  axios.interceptors.request.use((req) => {
    const {
      auth: { token },
    } = store.getState();
    req.headers["authorization"] = `Bearer ${token}`;
    return req;
  });
};

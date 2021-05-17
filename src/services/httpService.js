/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { tokenKey, apiUrl } from "../config.json";
import TokenService from "../utilities/tokenMethods";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("An unexpected error occurred , logging the error", error);
  }
  return Promise.reject(error);
});

axios.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken(tokenKey);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = null;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

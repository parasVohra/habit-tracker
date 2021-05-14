/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     console.log("An unexpected error occurred , logging the error", error);
//   }

//   return Promise.reject(error);
// });

function setTokenHeader(jwt) {
  axios.defaults.headers.common["x-auth-token"] = `Bearer ${jwt}`;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setTokenHeader,
};

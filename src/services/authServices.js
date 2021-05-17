import http from "./httpService";
import { apiUrl } from "../config.json";
import tokenService from "../utilities/tokenMethods";

export async function signUp(data) {
  try {
    const response = await http.post(apiUrl + "signUp", data);
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function signIn(data) {
  return await http.post(apiUrl + "signIn", data);
}

export async function signOut(tokenKey) {
  // remove token from the local storage
  tokenService.removeToken(tokenKey);
}

export default {
  signUp,
  signIn,
  signOut,
};

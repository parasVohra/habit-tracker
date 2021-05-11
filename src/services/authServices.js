import http from "./httpService";
import { apiUrl } from "../config.json";
import tokenService from "../utilities/tokenMethods";

export async function signUp(data) {
  let response = await http.post(apiUrl + "signUp", data);
  return Promise.resolve(response);
}

export async function signIn(data) {
  let response = await http.post(apiUrl + "signIn", data);
  return Promise.resolve(response);
}

export async function signOut(tokenKey) {
  // remove token from the local storage
  tokenService.removeToken(tokenKey);
}

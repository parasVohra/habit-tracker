import config from "../config.json";
import decodeJwt from "jwt-decode";
const tokenService = {};

tokenService.setToken = function setTokenToLocalStorage(token) {
  let tokenKey = config.tokenKey;
  localStorage.setItem(tokenKey, token);
};

tokenService.getToken = function getTokenFromLocalStorage(tokenKey) {
  return localStorage.getItem(tokenKey);
};

tokenService.hasToken = function checkTokenIsPresent(tokenKey) {
  return tokenService.getToken(tokenKey) !== null ? true : false;
};

tokenService.removeToken = function removeTokenFromLocalStorage(tokenKey) {
  localStorage.removeItem(tokenKey);
};

tokenService.getUserInfo = function decodeUserInfoFromToken(tokenKey) {
  const token = this.getToken(tokenKey);
  const userInfoObj = decodeJwt(token);
  return userInfoObj;
};

export default tokenService;

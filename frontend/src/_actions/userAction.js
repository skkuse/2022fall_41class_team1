import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, VERIFY_USER, CHECK_USER, FIND_USER, LOGIN_CHECK, LOGOUT_CHECK } from "./types";
import { request } from "../utils/axios";

export function registerUser(dataToSubmit) {
  const data = request("post", "/api/auth/join", dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function loginUser(dataToSubmit) {
  const data = request("post", "/api", dataToSubmit);
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function logoutUser() {
  const data = request("post", "/api/auth/logout");

  return {
    type: LOGOUT_USER,
    payload: data,
  };
}

export function verifyUser(dataToSubmit) {
  const data = request("post", "/api/email/verify", dataToSubmit);

  return {
    type: VERIFY_USER,
    payload: data,
  };
}

export function checkUser(dataToSubmit) {
  const data = request("post", "/api/email/verify-key", dataToSubmit);

  return {
    type: CHECK_USER,
    payload: data,
  };
}

export function findUser(dataToSubmit) {
  const data = request("post", "/api/email/reset-password", dataToSubmit);

  return {
    type: FIND_USER,
    payload: data,
  };
}


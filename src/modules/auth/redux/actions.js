import * as types from './constants';

export const postLogin = (payload, redirect) => ({
  type: types.LOGIN,
  payload,
  redirect,
});

export const loginSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

export const logout = (callbackSuccess) => ({
  type: types.LOGOUT,
  callbackSuccess,
});

export const postSignup = (payload, redirect, callbackSuccess, callbackFailed) => ({
  type: types.SIGN_UP,
  payload,
  redirect,
  callbackSuccess,
  callbackFailed,
});

export const postForgotPassword = (payload, callbackSuccess, callbackFailed) => ({
  type: types.FORGOT_PASSWORD,
  payload,
  callbackSuccess,
  callbackFailed,
});

export const postResetPassword = (payload, redirect, callbackSuccess, callbackFailed) => ({
  type: types.RESET_PASSWORD,
  payload,
  redirect,
  callbackSuccess,
  callbackFailed,
});

export const postActiveAccount = (payload, redirect) => ({
  type: types.ACTIVE_ACCOUNT,
  payload,
  redirect,
});

export const updatedAvatar = (payload) => ({
  type: types.UPDATED_AVATAR,
  payload,
});

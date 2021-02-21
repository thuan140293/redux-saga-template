import Cookies from "js-cookie";
import { all, takeLatest, call, put } from "redux-saga/effects";
import {
  ROOT_API_URL,
  USER_INFO_KEY,
  LANGUAGE,
  LANGUAGE_LIST,
} from "commons/constants";
import fetchHelper from "helpers/FetchHelper";
import { get } from "lodash";
import * as types from "./constants";
import * as actions from "./actions";

const setSession = (token, redirectCallback = () => null) => {
  // process.env.NODE_ENV === 'development' && Cookies.set('token', token);
  Cookies.set("token", token);
  setTimeout(redirectCallback(), 100);
};

function* onLogin({ payload, redirect }) {
  const { data } = yield call(requestLogin, payload);
  if (get(data, "status_code") === 200) {
    setSession(get(data, "data.token"), redirect);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.data));
    localStorage.setItem(LANGUAGE, LANGUAGE_LIST[0].key);
    yield put(actions.loginSuccess(data.data));
    return;
  }
}

function* onLogout({ callbackSuccess }) {
  const { data } = yield call(requestLogout);
  if (get(data, "status_code") === 200) {
    localStorage.removeItem(USER_INFO_KEY);
    callbackSuccess();
    return;
  }
}

function* onSignUp(action) {
  const { payload, redirect, callbackSuccess, callbackFailed } = action;
  const { data } = yield call(requestSignUp, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(get(data, "message"));
    redirect();
    return;
  } else {
    callbackFailed(get(data, "message"));
    return;
  }
}

function* onForgotPassword(action) {
  const { payload, callbackSuccess, callbackFailed } = action;
  const { data } = yield call(requestForgotPassword, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(get(data, "message"));
    // redirect();
    return;
  } else {
    callbackFailed(get(data, "message"));
    return;
  }
}

function* onResetPassword(action) {
  const { payload, redirect, callbackSuccess, callbackFailed } = action;
  const { data } = yield call(requestResetPassword, payload);
  if (get(data, "status_code") === 200) {
    callbackSuccess(get(data, "message"));
    redirect();
    return;
  } else {
    callbackFailed(get(data, "message"));
    return;
  }
}

function* onActiveAccount(action) {
  const { payload, redirect } = action;
  const { data } = yield call(requestActiveAccount, payload);
  if (get(data, "status_code") === 200) {
    redirect("success");
    return;
  } else {
    redirect("failed");
    return;
  }
}
export default function* rootSaga() {
  yield all([
    takeLatest(types.LOGIN, onLogin),
    takeLatest(types.LOGOUT, onLogout),
    takeLatest(types.SIGN_UP, onSignUp),
    takeLatest(types.FORGOT_PASSWORD, onForgotPassword),
    takeLatest(types.RESET_PASSWORD, onResetPassword),
    takeLatest(types.ACTIVE_ACCOUNT, onActiveAccount),
  ]);
}

// Request Api
function requestLogin(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestLogout() {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/logout`, {
      method: "GET",
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestSignUp(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestForgotPassword(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/forgot-password`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestResetPassword(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/new-password`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

function requestActiveAccount(payload) {
  return fetchHelper
    .fetch(`${ROOT_API_URL}/active-account`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
    .then(([resp, status]) => {
      return {
        data: resp,
        status,
      };
    });
}

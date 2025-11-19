import { takeLatest, call, put, all } from "redux-saga/effects";
import apiAuth from "../../services/apiAuth";
import { toast } from "react-toastify";

import {
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
  USER_LOGOUT,
} from "../Constants/authConstants";

import {
  loginSuccess,
  loginFail,
  registerSuccess,
  registerFail,
  logout as logoutAction,
} from "../Actions/authActions";

function* handleLogin(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(apiAuth.post, "/login", { email, password });
    const { token } = response.data;

    const user = { email };

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    yield put(loginSuccess({ token, user }));
  } catch (err) {
    const message = err.response?.data?.error || err.message || "Login failed";
    yield put(loginFail(message));
  }
}

function* handleRegister(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(apiAuth.post, "/register", { email, password });
    const { token, id } = response.data;
    const user = { id, email };

    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    yield put(registerSuccess({ token, user }));
  } catch (err) {
    const message =
      err.response?.data?.error || err.message || "Registration failed";
    yield put(registerFail(message));
  }
}

function* handleLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
  toast.info("Session expired — please login again");
}

function* initAuth() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    yield put(logoutAction());
  }
}

export function* watchAuthSagas() {
  yield takeLatest(USER_LOGIN_REQUEST, handleLogin);
  yield takeLatest(USER_REGISTER_REQUEST, handleRegister);
  yield takeLatest(USER_LOGOUT, handleLogout);
}

export default function* authRoot() {
  yield all([call(initAuth), watchAuthSagas()]);
}

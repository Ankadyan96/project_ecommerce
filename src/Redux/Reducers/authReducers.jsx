import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "../Constants/authConstants";

const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const userFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  token: tokenFromStorage,
  user: userFromStorage,
  loading: false,
  error: null,
  isAuthenticated: !!tokenFromStorage,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case USER_LOGIN_SUCCESS:
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case USER_LOGOUT:
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

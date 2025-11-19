import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
} from "../Constants/authConstants";


export const loginRequest = (payload)=>{
  return{
    type:USER_LOGIN_REQUEST,
    payload
  }
}

export const loginSuccess = (payload)=>{
  return{
    type:USER_LOGIN_SUCCESS,
    payload
  }
}

export const loginFail = (error)=>{
  return{
    type:USER_LOGIN_FAIL,
    error
  }
}

export const registerRequest = (payload)=>{
  return{
    type:USER_REGISTER_REQUEST,
    payload
  }
}

export const registerSuccess = (payload)=>{
  return{
    type:USER_REGISTER_SUCCESS,
    payload
  }
}

export const registerFail = (error)=>{
  return{
    type:USER_REGISTER_FAIL,
    error
  }
}

export const logout = ()=>{
  return{
    type:USER_LOGOUT
  }
}
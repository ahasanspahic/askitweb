import axios from "axios";
import {LOCALHOST_API, PRODUCTION_LIKE_API} from '../../config.js'; 
const url = PRODUCTION_LIKE_API;

export function fetchUser() {
  let user = JSON.parse(sessionStorage.getItem('user'));
  if(user){
    return {
      type: "FETCH_USER",
      payload: {
        userId: user.userId,
        username: user.username,
        token: user.token
      }
    }
  }
  else {
    return {
      type: "FETCH_USER",
      payload: {
        userId:null,
        username: null,
        token: null,
      }
    }
  }
}

  export function login(username,password) {
    return function(dispatch) {
      dispatch({type: "LOGGING"});
      
     axios.post(url+"users/login",{
      username: username,
      password: password
    })
     .then((response) => {
      sessionStorage.setItem('user', JSON.stringify(response.data));
       dispatch({type: "LOGGED", payload: response.data})
     })
     .catch((err) => {
       dispatch({type: "LOGGING_ERROR", payload: err.response.data.message})
     })
    }
  }
 
  export function logout() {
    return function(dispatch) {
      dispatch({type: "LOGOUT"});
      sessionStorage.removeItem('user');
      dispatch({type: "LOGOUT_SUCCESS"});
    }
  }

  export function changePassword(password,newPassword,userId,token) {
    return function(dispatch) {
      dispatch({type: "CHANGE_PASSWORD"});      
      axios.put(url+"users/"+userId,{
        password: password,
        newPassword: newPassword
      },
      {headers: {
        "Authorization" : token
      }
      })
      .then((response) => {
        dispatch({type: "CHANGE_PASSWORD_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "CHANGE_PASSWORD_FAILED", payload: err.response.data.message})
      })
    }
  }
  export function register(username,password) {
    return function(dispatch) {
      dispatch({type: "REGISTER"});      
      axios.post(url+"users",{
        username: username,
        password: password
      })
      .then((response) => {
        dispatch({type: "REGISTERED", payload: response.data});
      })
      .catch((err) => {
        dispatch({type: "REGISTER_FAILED", payload: err.response.data.message})
      })
    }
  }
  export function successNotificationShowed(username,password) {
    return {type: "SUCCESS_NOTIFICATION_SHOWED"};
  }
  export function getActiveUsers(page,pageSize) {
    return function(dispatch) {
      dispatch({type: "GET_ACTIVE_USERS"});      
      axios.get(url+"users/mostActiveUsers/"+page+"/"+pageSize)
      .then((response) => {
        dispatch({type: "GET_ACTIVE_USERS_SUCCESS", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "GET_ACTIVE_USERS_FAILED", payload: err.response.data.message})
      })
    }
  }
  /* Check if the token is still valid */
  export function isValid(token) {
    return function(dispatch) {
      dispatch({type: "IS_VALID"});      
      axios.get(url+"users/isValid",
      {headers: {
        "Authorization" : token
      }
      })
      .then((response) => {
        dispatch({type: "IS_VALID_SUCCESS", payload: response.data});
        if(!response.data.valid) {
          sessionStorage.removeItem('user');
        }
      })
      .catch((err) => {
        dispatch({type: "IS_VALID_FAILED", payload: err})
      })
    }
  } 
let user = JSON.parse(sessionStorage.getItem('user'));
//const initialState = user ? { loggedIn: true, user } : {};
/* This will make sure we have the data from the local storage about the user.
 Axios request will be fired from App.jsx on first load to check if the login is still valid and overwrite this data if neccessary. */
export default function reducer(state={
    user: {
      id: user ? user.userId : null,
      name: user ? user.username : null,
      token: user ? user.token : null,
    },
    fetching: false,
    fetched: false,
    logging: false,
    logged: user ? true : false,
    error: null,
    loginError: null,
    registerError: null,
    changePasswordError: null,
    mostActiveUsers: [],
    successMessageShowed: false,
    errorMessageShowed: false,
  }, action) {

    switch (action.type) {
      case "FETCH_USER": {
          return {...state}
        }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload},
        }
      }
      /* LOGIN / LOGOUT IS_VALID */
      case "LOGGING": {
        return {...state, fetching: true, fetched: false, logged: false, logging: true}
      }
      case "LOGGED": {
        return {...state, fetching: false, fetched: true, logged: true, logging: false, error: null,
           user: {
          ...state.user, 
          name: action.payload.username,
          id: action.payload.userId, 
          token: action.payload.token}}
      }
      case "LOGGING_ERROR": {
        return {...state, 
          fetching: false, fetched: false, 
          logged: false, logging: false,
          loginError: action.payload}
      }
      case "IS_VALID": {
        return {...state, fetching: true, fetched: false}
      }
      case "IS_VALID_SUCCESS": {
        return {...state, 
          fetching: false, fetched: true, 
          logged: action.payload.valid, 
          logging: false, error: null,
          user: {
            ...state.user, 
            name: action.payload.valid ? state.user.name : null,
            id: action.payload.valid ? state.user.id : null, 
            token: action.payload.valid ? state.user.token : null}}
      }
      case "IS_VALID_FAILED": {
        return {...state, 
          fetching: false, fetched: false, 
          logged: false, logging: false,
          error: action.payload}
      }
      case "ADD_PREVIOUS_PAGE": {
        return {...state, 
          previousPage: action.payload}
      }
      case "LOGOUT_SUCCESS": {
        return {...state, fetching: false, fetched: true, logged: false, logging: false, error: null,
           user: {
          ...state.user, 
          name: null,
          id: null, 
          token: null}}
      }
      /* Register */
      case "REGISTER": {
        return {...state, 
          fetching: true, fetched: false, 
          logged: false, logging: false,
          error: null}
      }
      case "REGISTERED": {
        return {...state, 
          fetching: false, fetched: false, 
          logged: false, logging: false,
          error: null, successMessageShowed: true,
          registerError: null, loginError:null,error: null}
      }
      case "REGISTER_FAILED": {
        return {...state, 
          fetching: false, fetched: false, 
          logged: false, logging: false,
          registerError: action.payload}
      }
      /* Change password */
      case "CHANGE_PASSWORD": {
        return {...state, 
          fetching: true, fetched: false, 
          error: null}
      }
      case "CHANGE_PASSWORD_SUCCESS": {
        return {...state, fetching: false, fetched: false,  successMessageShowed: true,
          errorMessageShowed: false, changePasswordError: null}
      }
      case "CHANGE_PASSWORD_FAILED": {
        return {...state, fetching: false, fetched: false, errorMessageShowed: true, changePasswordError: action.payload}
      }
      case "SUCCESS_NOTIFICATION_SHOWED": {
        return {...state, 
          successMessageShowed: false
        }
      }
      case "ERROR_NOTIFICATION_SHOWED": {
        return {...state, 
          errorMessageShowed: false
        }
      }
      /* Active users */
      case "GET_ACTIVE_USERS": {
        return {...state, 
          fetching: true, fetched: false, error: null}
      }
      case "GET_ACTIVE_USERS_SUCCESS": {
        return {...state, 
          fetching: false, fetched: false, 
          error: null, mostActiveUsers: action.payload}
      }
      case "GET_ACTIVE_USERS_FAILED": {
        return {...state, 
          fetching: false, fetched: false, 
          logged: false, logging: false,
          error: action.payload}
      }
    }

    return state
}
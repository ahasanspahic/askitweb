import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'

import questions from "./questionReducer";
import users from "./userReducer";

export default combineReducers({
    questions,
    users,
    router: routerReducer,
})
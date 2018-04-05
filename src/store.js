import { applyMiddleware, createStore } from "redux"

import logger from "redux-logger"
import thunk from "redux-thunk"

import reducer from "./reducers"

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
export const history = createHistory();
/* Logger is not longer a function, but a module */
const middleware = applyMiddleware(thunk, logger,routerMiddleware(history));

export default createStore(reducer, middleware)
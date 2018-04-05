import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './src/components/App.jsx';
import store, {history}  from "./src/store.js";
import { ConnectedRouter } from 'react-router-redux';


ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
        <div>
            <App /></div>
        </ConnectedRouter>
    </Provider>, 
document.getElementById('app'));

//store.dispatch({type: "SET_USER_AGE", payload: 27})
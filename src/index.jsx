import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from 'components/Main.jsx';
import {camera} from 'states/camera-reducers.js';
import {account} from 'states/account-reducers.js';

import 'bootstrap/dist/css/bootstrap.css';

window.onload = function () {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        camera,account
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));

    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                <Main />
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('root')
    );
};

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Socket } from 'react-socket-io';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from 'components/Main.jsx';
import { camera } from 'states/camera-reducers.js';
import { account } from 'states/account-reducers.js';
import { photos } from 'states/photos-reducers.js';

import 'bootstrap/dist/css/bootstrap.css';

import Chat from 'components/Chat.jsx';

window.onload = function () {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        camera, account, photos
    }), composeEnhancers(applyMiddleware(thunkMiddleware)));
    const uri = 'http://localhost/8080';
    const options = { transports: ['websocket'] };

    ReactDOM.render(
        <Provider store={store}>
            <MuiThemeProvider>
                {/* <Socket uri={uri} options={options}> */}
                    <Main />
                    {/* <Chat /> */}
                {/* </Socket> */}
            </MuiThemeProvider>
        </Provider>,
        document.getElementById('root')
    );
};

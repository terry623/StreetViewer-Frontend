import {
    signup as signup_FromApi,
    login as login_FromApi,
} from 'api/account.js';

function identity(account) {
    return {
        type: '@Account/IDENTITY',
        account
    };
}

export function show_message(message) {
    return {
        type: '@Account/SHOW_MESSAGE',
        message
    };
}

export function sign_up(username, password) {
    return (dispatch, getState) => {
        return signup_FromApi(username, password).then(infor => {
            dispatch(show_message("Finish Sign Up!"));
        }).catch(err => {
            dispatch(show_message("Account Exist!"));
        });
    };
}

export function log_in(username, password) {
    return (dispatch, getState) => {
        return login_FromApi(username, password).then(infor => {
            dispatch(show_message("Finish Log In!"));
            dispatch(identity(infor[0].username));
        }).catch(err => {
            dispatch(show_message("Wrong Account or Password!"));
        });
    };
}

export function log_out() {
    return {
        type: '@Account/LOG_OUT',
    };
}

export function clear_msg() {
    return (dispatch, getState) => {
        dispatch(show_message(""));
    };
}
import {
    sign_up as signupFromApi,
    log_in as loginFromApi,
} from 'api/account.js';

function identity(account) {
    return {
        type: '@Account/IDENTITY',
        account
    };
}

function end_sign_up(message) {
    return {
        type: '@Account/SIGN_UP',
        message
    };
}

export function sign_up(username, password) {
    return (dispatch, getState) => {
        return signupFromApi(username, password).then(infor => {     
            dispatch(end_sign_up("Finish Sign Up!"));
            dispatch(identity(infor.username))
        }).catch(err => {
            dispatch(end_sign_up("Account Exist!"));
        });
    }; 
}

function end_log_in(message) {
    return {
        type: '@Account/LOG_IN',
        message
    };
}

export function log_in(username, password) {
    return (dispatch, getState) => {
        return loginFromApi(username, password).then(infor => {
            dispatch(end_log_in("Finish Log In!"));
            dispatch(identity(infor[0].username))            
        }).catch(err => {
            dispatch(end_log_in("Wrong Account or Password!"));
        });
    };
}
import {
    sign_up as signupFromApi,
    log_in as loginFromApi,
} from 'api/account.js';

function endsignup(infor) {
    return {
        type: '@Account/SIGN_UP',
        infor
    };
}

export function sign_up(email, account, password) {
    return (dispatch, getState) => {
        return signupFromApi(email, account, password).then(infor => {
            dispatch(endsignup(infor));
        }).catch(err => {
            console.error('Error sign up', err);
        });
    };
}

function endlogin(infor) {
    return {
        type: '@Account/LOG_IN',
        infor
    };
}

export function log_in(account, password) {
    return (dispatch, getState) => {
        return loginFromApi(account, password).then(infor => {
            dispatch(endlogin(infor));
        }).catch(err => {
            console.error('Error log in', err);
        });
    };
}
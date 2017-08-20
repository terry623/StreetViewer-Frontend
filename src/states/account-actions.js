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

export function sign_up(username, password) {
    return (dispatch, getState) => {
        return signupFromApi(username, password).then(infor => {            
            dispatch(endsignup("Finish Sign Up!"));
        }).catch(err => {
            dispatch(endsignup("Account Exist!"));
        });
    };
}

function endlogin(infor) {
    return {
        type: '@Account/LOG_IN',
        infor
    };
}

export function log_in(username, password) {
    return (dispatch, getState) => {
        return loginFromApi(username, password).then(infor => {
            dispatch(endlogin("Finish Log In!"));
        }).catch(err => {
            dispatch(endsignup("Wrong Account or Password!"));
        });
    };
}
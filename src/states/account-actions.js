export function sign_up(email, account, password) {
    return {
        type: '@Account/SIGN_UP',
        email,
        account,
        password
    };
}

export function log_in(account, password) {
    return {
        type: '@Account/LOG_IN',
        account,
        password
    };
}
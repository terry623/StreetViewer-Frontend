const initAccountState = {
    email: "0",
    account:"0",
    password:"0"
};

export function account(state = initAccountState, action) {
    switch (action.type) {
        case '@Account/SIGN_UP':
            return {
                ...state,
                email: action.email,
                account: action.account,
                password: action.password,
            };
        case '@Account/LOG_IN':
            return {
                ...state,
                account: action.account,
                password: action.password,
            };
        default:
            return state;
    }
}
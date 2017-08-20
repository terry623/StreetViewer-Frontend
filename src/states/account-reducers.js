const initMessageState = {
    message: "",
    account: ""
};

export function account(state = initMessageState, action) {
    switch (action.type) {
        case '@Account/SIGN_UP':
            return {
                ...state,
                message: action.message
            };
        case '@Account/LOG_IN':
            return {
                ...state,
                message: action.message
            };
        case '@Account/IDENTITY':
            return {
                ...state,
                account: action.account
            };
        default:
            return state;
    }
}
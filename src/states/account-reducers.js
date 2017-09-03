const initMessageState = {
    message: "Nothing Happen",
    account: ""
};

export function account(state = initMessageState, action) {
    switch (action.type) {
        case '@Account/SHOW_MESSAGE':
            return {
                ...state,
                message: action.message
            };
        case '@Account/IDENTITY':
            return {
                ...state,
                account: action.account
            };
        case '@Account/LOG_OUT':
            return {
                ...state,
                account: ""
            };
        default:
            return state;
    }
}
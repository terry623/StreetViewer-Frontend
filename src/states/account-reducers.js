const initInforState = {
    infor: ""
};

export function account(state = initInforState, action) {
    switch (action.type) {
        case '@Account/SIGN_UP':
            return {
                infor: action.infor
            };
        case '@Account/LOG_IN':
            return {
                infor: action.infor
            };
        default:
            return state;
    }
}
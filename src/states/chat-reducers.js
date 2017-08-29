const initChatState = {
    friends: []
};

export function chat(state = initChatState, action) {
    switch (action.type) {
        case '@Chat/FRIENDS_ARROUND_YOU':
            return {
                ...state,
                friends: action.friends
            };
        default:
            return state;
    }
}
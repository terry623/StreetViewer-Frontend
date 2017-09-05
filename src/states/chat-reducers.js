const initChatState = {
    friends: [],
    select_friend: ""
};

export function chat(state = initChatState, action) {
    switch (action.type) {
        case '@Chat/FRIENDS_ARROUND_YOU':
            return {
                ...state,
                friends: action.friends
            };
        case '@Chat/SELECT_FRIEND':
            return {
                ...state,
                select_friend: action.select_friend
            };
        default:
            return state;
    }
}
import {
    find_friends_around_you as finds_friends_around_you_FromApi
} from 'api/chat.js';

function show_friends(friends) {
    return {
        type: '@Chat/FRIENDS_ARROUND_YOU',
        friends
    };
}

export function find_friends_around_you(account) {
    return (dispatch, getState) => {
        return finds_friends_around_you_FromApi(account).then(result => {
            dispatch(show_friends(result));
        }).catch(err => {});
    };
}
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

export function select_friend(select_friend) {
    return {
        type: '@Chat/SELECT_FRIEND',
        select_friend
    };
}
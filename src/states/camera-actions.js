import {
    store_location as storelocationFromApi,
} from 'api/photo.js';

export function screenshot(lat, lng, heading, pitch) {
    return {
        type: '@CAMERA/SCREENSHOT',
        lat,
        lng,
        heading,
        pitch
    };
}

export function end_store_location(message) {
    return {
        type: '@CAMERA/STORE_LOCATION',
        message
    };
}

export function store_location(account, lat, lng) {
    return (dispatch, getState) => {
        return storelocationFromApi(account, lat, lng).then(infor => {
            dispatch(end_store_location("Finish Store Location!"));
        }).catch(err => {
            dispatch(end_store_location("Error!"));
        });
    };
}
import {
    store_current_position as store_current_position_FromApi,
    store_last_position as store_last_position_FromApi,
    store_photo_url as store_photo_url_FromApi,
    get_current_position as get_current_position_FromApi,
    get_last_position as get_last_position_FromApi
} from 'api/photo.js';

export function store_current_position(account, lat, lng) {
    return (dispatch, getState) => {
        return store_current_position_FromApi(account, lat, lng).then(infor => {
            dispatch(show_message("Finish Store Current Postition!"));
        }).catch(err => {
            dispatch(show_message("Store Current Postition Error!"));
        });
    };
}

export function store_last_position(account, lat, lng) {
    return (dispatch, getState) => {
        return store_last_position_FromApi(account, lat, lng).then(infor => {
            dispatch(show_message("Finish Store Last Position!"));
        }).catch(err => {
            dispatch(show_message("Store Last Position Error!"));
        });
    };
}

export function screenshot(account, lat, lng, heading, pitch) {
    const google_key = 'AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4';
    const base_url = `https://maps.googleapis.com/maps/api/streetview?size=300x200`;
    var photo_url = `${base_url}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&key=${google_key}`;
    return (dispatch, getState) => {
        return store_photo_url_FromApi(account, photo_url).then(infor => {
            dispatch(show_message("Finish Store Photo!"));
        }).catch(err => {
            dispatch(show_message("Store Photo Error!"));
        });
    };
}

export function get_current_position(account) {
    return (dispatch, getState) => {
        return get_current_position_FromApi(account).then(infor => {
            dispatch(show_message("Finish Get Current Position!"));
        }).catch(err => {
            dispatch(show_message("Get Current Position Error!"));
        });
    };
}

export function get_last_position(account) {
    return (dispatch, getState) => {
        return get_last_position_FromApi(account).then(infor => {
            dispatch(start_last_location(infor.store_lat, infor.store_lng));
            dispatch(show_message("Finish Get Last Position!"));
        }).catch(err => {
            dispatch(show_message("Get Last Position Error!"));
        });
    };
}

function start_last_location(lat, lng) {
    return {
        type: '@CAMERA/START_LAST_LOCATION',
        lat,
        lng
    };
}

function show_message(message) {
    return {
        type: '@CAMERA/SHOW_MESSAGE',
        message
    };
}
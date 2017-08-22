import {
    store_location as storelocationFromApi,
    store_photo_url as storephotoFromApi,
    get_store_photo_url as getstorelocationFromApi,
    store_current_position as storecurrentpositionFromApi,
} from 'api/photo.js';

export function screenshot(account, lat, lng, heading, pitch) {
    const google_key = 'AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4';
    const base_url = `https://maps.googleapis.com/maps/api/streetview?size=300x200`;
    var url = `${base_url}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&key=${google_key}`;
    return (dispatch, getState) => {
        return storephotoFromApi(account, url).then(infor => {
            dispatch(get_photo_url(infor.url));
            dispatch(show_message("Finish Store Photo!"));
        }).catch(err => {
            dispatch(show_message("Store Photo Error!"));
        });
    };
}

export function store_location(account, lat, lng) {
    return (dispatch, getState) => {
        return storelocationFromApi(account, lat, lng).then(infor => {
            dispatch(show_message("Finish Store Location!"));
        }).catch(err => {
            dispatch(show_message("Store Location Error!"));
        });
    };
}

export function get_store_location(account) {
    return (dispatch, getState) => {
        return getstorelocationFromApi(account).then(infor => {
            dispatch(start_location(infor.store_lat, infor.store_lng));
            dispatch(show_message("Finish Get Store Location!"));
        }).catch(err => {
            dispatch(show_message("Get Store Location Error!"));
        });
    };
}

export function current_position(account, lat, lng) {
    return (dispatch, getState) => {
        return storecurrentpositionFromApi(account, lat, lng).then(infor => {
            dispatch(show_message("Finish Store Current Postition!"));
        }).catch(err => {
            dispatch(show_message("Store Current Postition Error!"));
        });
    };
}

export function start_location(lat, lng) {
    return {
        type: '@CAMERA/START_LOCATION',
        lat,
        lng
    };
}

export function get_photo_url(url) {
    return {
        type: '@CAMERA/GET_PHOTO_URL',
        url
    };
}

export function show_message(message) {
    return {
        type: '@CAMERA/SHOW_MESSAGE',
        message
    };
}
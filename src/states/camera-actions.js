import {
    store_current_position as store_current_position_FromApi,
    store_photo_url as store_photo_url_FromApi,
    get_last_position as get_last_position_FromApi
} from 'api/photo.js';

var getPosition = function (options) {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

export function store_current_position(account, lat, lng, heading, pitch, time) {
    return (dispatch, getState) => {
        return store_current_position_FromApi(account, lat, lng, heading, pitch, time).then(infor => {
            dispatch(start_location(infor.current_lat, infor.current_lng, infor.current_heading, infor.current_pitch, infor.travel_time));
            dispatch(remind_action("Finish Store Current Postition!"));
        }).catch(err => {
            dispatch(remind_action("Store Current Postition Error!"));
        });
    };
}

export function screenshot(account, lat, lng, heading, pitch) {
    const google_key = 'AIzaSyB2qGLOwrR1n-FrGskEn47AU1X6Nban0S4';
    const base_url = `https://maps.googleapis.com/maps/api/streetview?size=300x200`;
    var photo_url = `${base_url}&location=${lat},${lng}&heading=${heading}&pitch=${pitch}&key=${google_key}`;
    return (dispatch, getState) => {
        return store_photo_url_FromApi(account, photo_url).then(infor => {
            dispatch(remind_action("Finish Store Photo!"));
        }).catch(err => {
            dispatch(remind_action("Store Photo Error!"));
        });
    };
}

export function get_last_position(account, lat, lng, heading, pitch, time) {
    return (dispatch, getState) => {
        return get_last_position_FromApi(account).then(infor => {
            if (infor.current_lat !== 0 && infor.current_lng !== 0) {
                dispatch(start_location(infor.current_lat, infor.current_lng, infor.current_heading, infor.current_pitch, infor.travel_time));
            } else {
                // getPosition().then((position) => {
                //     console.log("position.coords.latitude: " + position.coords.latitude);
                //     console.log("position.coords.longitude: " + position.coords.longitude);
                //     dispatch(store_current_position(account, position.coords.latitude, position.coords.longitude, heading, pitch, time));
                // }).catch((err) => {
                //     console.error(err.message);
                // });
                dispatch(store_current_position(account, lat, lng, heading, pitch, time));
            }
            dispatch(remind_action("Finish Get Last Position!"));
        }).catch(err => {
            dispatch(remind_action("Get Last Position Error!"));
        });
    };
}

function start_location(lat, lng, heading, pitch, time) {
    return {
        type: '@CAMERA/START_LOCATION',
        lat,
        lng,
        heading,
        pitch,
        time
    };
}

function remind_action(reminder) {
    return {
        type: '@CAMERA/REMIND_ACTION',
        reminder
    };
}
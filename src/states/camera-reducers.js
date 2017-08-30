var user_real_lat = 0;
var user_real_lng = 0;

navigator.geolocation.getCurrentPosition(function (position) {
    console.log("lat: " + position.coords.latitude);
    console.log("lng: " + position.coords.longitude);
    user_real_lat = position.coords.latitude;
    user_real_lng = position.coords.longitude;
});

var initCameraState = {
    lat: user_real_lat,
    lng: user_real_lng,
    heading: 100,
    pitch: 0,
    time: 0,
    reminder: "",
    finish_get_last_position: false
};

export function camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/REMIND_ACTION':
            return {
                ...state,
                reminder: action.reminder
            };
        case '@CAMERA/START_LOCATION':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
                heading: action.heading,
                pitch: action.pitch,
                time: action.time,
                finish_get_last_position: true
            };
        default:
            return state;
    }
}
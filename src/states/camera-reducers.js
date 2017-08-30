// navigator.geolocation.getCurrentPosition(function (position) {
//     console.log("lat: " + position.coords.latitude);
//     console.log("lng: " + position.coords.longitude);
// });

var initCameraState = {
    lat: navigator.geolocation.getCurrentPosition(function (position) {
        return position.coords.latitude
    }),
    lng: navigator.geolocation.getCurrentPosition(function (position) {
        return position.coords.longitude
    }),
    heading: 100,
    pitch: 0,
    time: 0,
    reminder: "",
    finish_get_last_position: false
};

console.log("initCameraState.lat: " + initCameraState.lat);
console.log("initCameraState.lng: " + initCameraState.lng);

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
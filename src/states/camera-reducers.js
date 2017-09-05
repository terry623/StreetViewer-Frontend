var initCameraState = {
    lat: 24.251684,
    lng: 120.719604,
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
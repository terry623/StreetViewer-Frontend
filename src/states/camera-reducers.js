const initCameraState = {
    lat: 24.239660117363,
    lng: 120.704508544016,
    heading: 100,
    pitch: 0,
    message: "",
    finish_get_last_position: false
};

export function camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/SHOW_MESSAGE':
            return {
                ...state,
                message: action.message
            };
        case '@CAMERA/START_LOCATION':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
                heading: action.heading,
                pitch: action.pitch,
                finish_get_last_position: true
            };
        default:
            return state;
    }
}
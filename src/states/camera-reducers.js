const initCameraState = {
    lat: 24.239660117363,
    lng: 120.704508544016,
    message: "",
    start_get_last_position:false,
    finish_get_last_position: false
};

export function camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/SHOW_MESSAGE':
            return {
                ...state,
                message: action.message
            };
        case '@CAMERA/START_LAST_LOCATION':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
                finish_get_last_position: true
            };
        case '@CAMERA/START_GET_LAST_POSITION':
            return {
                ...state,
                start_get_last_position: true
            };
        default:
            return state;
    }
}
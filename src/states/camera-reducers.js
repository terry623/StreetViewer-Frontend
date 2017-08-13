const initCameraState = {
    lat: 46.9171876,
    lng: 17.8951832,
};

export function move_camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/POSITION':
            return {
                lat: action.lat,
                lng: action.lng
            };
        default:
            return state;
    }
}
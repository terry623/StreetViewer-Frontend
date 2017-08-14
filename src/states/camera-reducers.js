const initCameraState = {
    lat: 46.9171876, //緯度
    lng: 17.8951832, //經度
    heading: 0, //旋轉
    fov: 90, //視野
    pitch: 0, //上下
};

export function camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/MOVE':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng
            };
        case '@CAMERA/ROTATE_RIGHT':
            return {
                ...state,
                heading: state.heading + 10
            };
        case '@CAMERA/ROTATE_LEFT':
            return {
                ...state,
                heading: state.heading - 10
            };
        case '@CAMERA/CHANGE_LENS_WIDE':
            return {
                ...state,
                fov: state.fov + 10
            };
        case '@CAMERA/CHANGE_LENS_NARROW':
            return {
                ...state,
                fov: state.fov - 10
            };
        case '@CAMERA/CHANGE_HEIGHT_MORE':
            return {
                ...state,
                pitch: state.pitch + 10
            };
        case '@CAMERA/CHANGE_HEIGHT_LESS':
            return {
                ...state,
                pitch: state.pitch - 10
            };
        default:
            return state;
    }
}
const initCameraState = {
    lat: 24.239647, //緯度
    lng: 120.704232, //經度
    heading: 0, //旋轉
    pitch: 0, //上下
};

export function camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/SCREENSHOT':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
                heading: action.heading,
                pitch: action.pitch
            };
        case '@CAMERA/STORE_LOCATION':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng,
            };
        default:
            return state;
    }
}
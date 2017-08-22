const initCameraState = {
    lat: 24.239647, //緯度
    lng: 120.704232, //經度
    message: "",
    url: ""
};

export function camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/SHOW_MESSAGE':
            return {
                ...state,
                message: action.message
            };
        case '@CAMERA/GET_PHOTO_URL':
            return {
                ...state,
                url: action.url
            };
        case '@CAMERA/START_LOCATION':
            return {
                ...state,
                lat: action.lat,
                lng: action.lng
            };
        default:
            return state;
    }
}
const initCameraState = {
    position_res: "24.239647,120.704232",
    heading_res: 0, //旋轉
    pitch_res: 0, //上下
};

export function camera(state = initCameraState, action) {
    switch (action.type) {
        case '@CAMERA/SCREENSHOT':
            return {
                ...state,
                position_res: action.position_res,
                heading_res: action.heading_res,
                pitch_res: action.pitch_res
            };
        case '@CAMERA/STORE_LOCATION':
            return {
                ...state,
                position_res: action.position_res,
            };
        default:
            return state;
    }
}
export function screenshot(position_res, heading_res, pitch_res) {
    return {
        type: '@CAMERA/SCREENSHOT',
        position_res,
        heading_res,
        pitch_res
    };
}

export function store_location(position_res) {

    return {
        type: '@CAMERA/STORE_LOCATION',
        position_res
    };
}
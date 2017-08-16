export function screenshot(lat, lng, heading, pitch) {
    return {
        type: '@CAMERA/SCREENSHOT',
        lat,
        lng,
        heading,
        pitch
    };
}

export function store_location(lat, lng) {
    return {
        type: '@CAMERA/STORE_LOCATION',
        lat,
        lng
    };
}
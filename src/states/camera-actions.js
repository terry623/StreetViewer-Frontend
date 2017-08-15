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

// var position_str = JSON.stringify(position);
// var position_res = position_str.replace(/\"/g, "").replace("{", "").replace("}", "").replace("lat:", "").replace("lng:", "").replace(":", "").split(",");
// var lat = position_res[0];
// var lng = position_res[1];

// var pov_str = JSON.stringify(pov);
// var pov_res = pov_str.replace(/\"/g, "").replace("{", "").replace("}", "").replace("heading:", "").replace("pitch:", "").replace(":", "").split(",");
// var heading = pov_res[0];
// var pitch = pov_res[1];
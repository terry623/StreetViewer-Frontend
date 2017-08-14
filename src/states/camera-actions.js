export function move(lat, lng) {
    return {
        type: '@CAMERA/MOVE',
        lat,
        lng
    };
}

export function rotate_right() {
    return {
        type: '@CAMERA/ROTATE_RIGHT'
    };
}

export function rotate_left() {
    return {
        type: '@CAMERA/ROTATE_LEFT'
    };
}

export function change_lens_wide() {
    return {
        type: '@CAMERA/CHANGE_LENS_WIDE'
    };
}

export function change_lens_narrow() {
    return {
        type: '@CAMERA/CHANGE_LENS_NARROW'
    };
}

export function change_height_more() {
    return {
        type: '@CAMERA/CHANGE_HEIGHT_MORE'
    };
}

export function change_height_less() {
    return {
        type: '@CAMERA/CHANGE_HEIGHT_LESS'
    };
}


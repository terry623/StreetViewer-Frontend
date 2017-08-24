const initPhotoState = {
    photos: []
};
export function photos(state = initPhotoState, action) {
    switch (action.type) {
        case '@PHOTO/GET_PHOTO_LIST':
            return {
                ...state,
                photos: action.photos
            };
        default:
            return state;
    }
}
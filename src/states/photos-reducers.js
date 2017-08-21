const initPhotoState = {
    photos: []
};
export function list_photos(state = initPhotoState, action) {
    switch (action.type) {
        case '@PHOTO/END_LIST_PHOTOS':
            return {
                ...state,
                photos: action.photos
            };
        default:
            return state;
    }
}
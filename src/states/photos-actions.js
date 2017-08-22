import {
    listPhotos as listPhotosFromApi,
} from 'api/photo.js';

function endListPhotos(photos) {
    return {
        type: '@PHOTO/END_LIST_PHOTOS',
        photos
    };
}

export function listPhotos(account) {
    return (dispatch, getState) => {
        return listPhotosFromApi(account).then(photos => {
            dispatch(endListPosts(photos));
        }).catch(err => {
            console.error('Error listing photos', err);
        });
    };
};
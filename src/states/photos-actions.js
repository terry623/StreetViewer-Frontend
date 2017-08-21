import {
    listPhotos as listPhotosFromApi,
} from 'api/photo.js';

function endListPhotos(photos) {
    return {
        type: '@POST/END_LIST_PHOTOS',
        photos
    };
}

export function listPhotos(account) {
    return (dispatch, getState) => {
        return listPhotosFromApi(searchText).then(photos => {
            dispatch(endListPosts(photos));
        }).catch(err => {
            console.error('Error listing photos', err);
        });
    };
};
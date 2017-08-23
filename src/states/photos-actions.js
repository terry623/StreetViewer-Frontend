import {
    list_photos as list_photos_FromApi,
} from 'api/photo.js';

function get_photos_list(photos) {
    return {
        type: '@PHOTO/GET_PHOTO_LIST',
        photos
    };
}

export function list_photos(account) {
    return (dispatch, getState) => {
        return list_photos_FromApi(account).then(photos => {
            dispatch(get_photos_list(photos));
        }).catch(err => {
            console.error('Error listing photos', err);
        });
    };
};
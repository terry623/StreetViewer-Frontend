import axios from 'axios';

// Develop server URL
const BaseUrl = 'http://localhost:8080/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function store_location(account, lat, lng) {
    let url = `${BaseUrl}/store_location`;

    console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        account,
        lat,
        lng
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function store_photo_url(account,url) {
    let url = `${BaseUrl}/store_photo_url`;

    console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        account,
        url
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function listPhotos(account) {
    let url = `${BaseUrl}/photos`;
    url += `?account=${account}`;

    console.log(`Making GET request to: ${url}`);

    return axios.get(url).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function get_store_photo_url(account) {
    let url = `${BaseUrl}/get_store_location`;

    console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        account
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
import axios from 'axios';

// Develop server URL
const BaseUrl = 'http://localhost:8080/api';

// Production server URL
// const BaseUrl = '';

export function store_socket_id(account, socket_id) {
    let url = `${BaseUrl}/store_socket_id`;

    console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        account,
        socket_id
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function get_target_socket_id(account) {
    let url = `${BaseUrl}/get_target_socket_id`;

    console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        account
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function find_friends_around_you(account) {
    let url = `${BaseUrl}/find_friends_around_you`;

    console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        account
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
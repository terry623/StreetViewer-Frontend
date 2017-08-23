import axios from 'axios';

// Develop server URL
const BaseUrl = 'http://localhost:8080/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function signup(username, password) {
    let url = `${BaseUrl}/signup`;

    console.log(`Making POST request to: ${url}`);
    return axios.post(url, {
        username,
        password
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function login(username, password) {
    let url = `${BaseUrl}/login`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        username,
        password
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
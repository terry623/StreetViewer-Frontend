import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://localhost:8080/api';

// Staging server URL
// const postBaseUrl = 'http://weathermood-staging.us-west-2.elasticbeanstalk.com/api';

// Production server URL
// const postBaseUrl = 'http://weathermood-production.us-west-2.elasticbeanstalk.com/api';

export function sign_up(email, account, password) {
    let url = `${postBaseUrl}/signup`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        email,
        account,
        password
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}

export function log_in(account, password) {
    let url = `${postBaseUrl}/login`;

    console.log(`Making POST request to: ${url}`);

    return axios.post(url, {
        account,
        password
    }).then(function (res) {
        if (res.status !== 200)
            throw new Error(`Unexpected response code: ${res.status}`);

        return res.data;
    });
}
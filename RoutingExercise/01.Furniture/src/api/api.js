import {clearUserData, getUserData, setUserData} from '../utility.js'
const host = 'http://localhost:3030'

async function request(fullUrl, options) {
    try {
        const response = await fetch(fullUrl, options);

        if (response.ok !== true) {
            if (response.status == 403) {
                clearUserData();
            }
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }
}
function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {},
    };

    if (data != undefined) {
        options.headers['content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData != null) {
        options.headers['X-Authorization'] = userData.token;
    }
    return options;
}

async function get(url) {
    return request(host + url, createOptions());
}

async function post(url, data) {
    return request(host + url, createOptions('post', data));
}

async function put(url, data) {
    return request(host + url, createOptions('put', data));
}

async function del(url) {
    return request(host + url, createOptions('delete'));
}

async function login(email, password) {
    const response = await request(host + '/users/login', createOptions('post', {email, password}));
    const userData = {
        email: response.email,
        id: response._id,
        token: response.accessToken
    };
    setUserData(userData);
}

async function register(email, password) {
    const response = await request(host + '/users/register', createOptions('post', {email, password}));
    const userData = {
        email: response.email,
        id: response._id,
        token: response.accessToken
    };
    setUserData(userData);
}

async function logout() {
    await request(host + '/users/logout', createOptions());
    clearUserData();
}


export {
    get,
    post,
    put,
    del,
    login,
    register,
    logout
}
const host = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.ok !== true) {
            if (response.status == 403) {
                sessionStorage.removeItem('userData');
            }
            const error = await response.json();
            throw new Error(error.message);
        }
        
        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

async function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (userData !== null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }
    
    return options;
}
 
async function get(url) {
    return request(host + url, createOptins());
}

async function post(url, data) {
    return request(host + url, createOptins('post', data));
}

async function put(url, data) {
    return request(host + url, createOptins('put', data));
}

async function del(url) {
    return request(host + url, createOptins('delete'));
}

async function login(email, password) {
    const response = await request('/users/login', createOptions('post', { email, password }));
    const userData = {
        email: userData.email,
        id: userData._id,
        token: userData.accessToken
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
};

async function register(email, password) {
    const response = await request('/users/register', createOptions('post', { email, password }));
    const userData = {
        email: userData.email,
        id: userData._id,
        token: userData.accessToken
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
};

async function logout() {
    await request('/users/logout', createOptions());
    sessionStorage.removeItem('userData');
};

sessionStorage.setItem('userData', JSON.stringify(userData));
export {
    get,
    post,
    put,
    del,
    login,
    register,
    logout 
}
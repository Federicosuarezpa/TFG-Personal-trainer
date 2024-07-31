const apiUrl = 'http://localhost:3000/api';

const requestMethods = { post: 'POST', get: 'GET', put: 'PUT', delete: 'DELETE' };

const endpoints = {
    login: '/users/login',
    register: '/register',
    users: '/users',
    recoverPassword: '/recover-password',
    resetPassword: '/reset-password',
}

async function fetchApi(path, { body, method, contentType = 'application/json', checkError = true }) {
    let token = localStorage.getItem('token');
    if (!token) token = sessionStorage.getItem('token');

    const headers = new Headers();
    headers.append('Authorization', token);

    if (contentType) {
        headers.append('Content-Type', contentType);
    }

    let requestBody;
    if (contentType === 'application/json' && body) {
        requestBody = JSON.stringify(body);
    } else {
        requestBody = body;
    }

    const response = await fetch(`${apiUrl}${path}`, { method, headers, body: requestBody });

    let responseData;
    try {
        responseData = await response.json();
    } catch (error) {
        if (checkError) {
            throw new Error('Invalid JSON response');
        } else {
            return response;
        }
    }

    if (checkError && responseData.status === 'error') {
        throw new Error(responseData.message);
    }

    return responseData;
}

export async function login( email, password ) {
    const tokenData = await fetchApi(endpoints.login, {
        method: requestMethods.post,
        body: { email, password },
    });
    const token = tokenData.token;
    localStorage.setItem('token', token);
    return token;
}

export async function register( email, password, age, phone, address, name, lastname ) {
    const tokenData = await fetchApi(endpoints.login, {
        method: requestMethods.post,
        body: { email, password, age, phone, address, name, lastname },
    });
    const token = tokenData.token;
    localStorage.setItem('token', token);
    return token;
}

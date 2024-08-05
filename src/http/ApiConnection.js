const apiUrl = 'http://localhost:3000/api';

const requestMethods = { post: 'POST', get: 'GET', put: 'PUT', delete: 'DELETE' };

const endpoints = {
    login: '/users/login',
    register: '/register',
    userUpdate: '/users/update-profile',
    recoverPassword: '/recover-password',
    resetPassword: '/reset-password',
    getUserData: '/users/',
    getUserHealthData: '/health/getAllUserHealthData',
    createHealthData: '/health/addWeekData',
}

async function fetchApi(path, { body, method, contentType = 'application/json', checkError = true }) {
    const token = sessionStorage.getItem('token');
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
    return await fetchApi(endpoints.login, {
        method: requestMethods.post,
        body: {email, password},
    });
}

export async function register( email, password, age, phone, address, name, lastname ) {
    const tokenData = await fetchApi(endpoints.login, {
        method: requestMethods.post,
        body: { email, password, age, phone, address, name, lastname },
    });
    const token = tokenData.token;
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
    return token;
}

export async function updateProfile( age, phone, address, gender ) {
    return await fetchApi(endpoints.userUpdate, {
        method: requestMethods.post,
        body: { age, phone, address, gender},
    });
}

export async function getUserData( id ) {
    return await fetchApi(endpoints.getUserData + `${id}`, {
        method: requestMethods.get,
    });
}

export async function getUserHealthData() {
    return await fetchApi(endpoints.getUserHealthData, {
        method: requestMethods.get,
    });
}

export async function createHealthData(weight, height, muscle, bodyfat, objective, frequency, image) {
    const formData = new FormData();
    formData.append('weight', weight);
    formData.append('height', height);
    formData.append('muscle', muscle);
    formData.append('bodyfat', bodyfat);
    formData.append('objective', objective);
    formData.append('frequency', frequency);
    if (image) {
        formData.append('fileUpload', image);
    }
    console.log(formData.get('fileUpload'));

    const response = await fetchFormData('/health/addWeekData', {
        method: 'POST',
        body: formData,
    });

    return await response.json();
}

async function fetchFormData(path, { body, method }) {
    let token = localStorage.getItem('token');
    if (!token) token = sessionStorage.getItem('token');
    const headers = new Headers();
    headers.append('Authorization', token);

    return await fetch(`${apiUrl}${path}`, { method, headers, body });
}


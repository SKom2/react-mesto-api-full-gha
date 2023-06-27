export const BASE_URL = 'http://api.mesto-otdiha.nomoredomains.work';

const makeRequest = (url, method, body, token) => {
    const options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    if (body) {
        options.body = JSON.stringify(body)
    }

    if (token) {
        options.headers.Authorization = `Bearer ${token}`
    }

    return fetch(`${BASE_URL}${url}`, options)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Ошибка код ${response.status}`)
        })

}

export const register = (email, password) => {
    return makeRequest(`/signup`, "POST", {email, password}, '')
}

export const authorize = (email, password) => {
    return makeRequest('/signin', "POST", {email, password}, '')
};

export const getContent = (token) => {
    return makeRequest('/users/me', "GET", null, token)
}

export class Api {
    constructor(config) {
        this._config = config;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getProfile() {
        return fetch(`${this._config.url}/users/me`, {
            headers: this._config.headers
        })
            .then((res) => this._getResponseData(res));
    }

    getCards() {
        return fetch(`${this._config.url}/cards`, {
            headers: this._config.headers
        })
            .then((res) => this._getResponseData(res))
    }

    editProfile(data) {
        return fetch(`${this._config.url}/users/me`, {
            method: 'PATCH',
            headers: this._config.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => this._getResponseData(res))
    }

    addCard(data) {
        return fetch(`${this._config.url}/cards`, {
            method: 'POST',
            headers: this._config.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => this._getResponseData(res))
    }

    handleControlLikes(request, cardId) {
        return fetch(`${this._config.url}/cards/${cardId}/likes`, {
            method: request,
            headers: this._config.headers,
        })
            .then((res) => this._getResponseData(res))
    }

    deleteCard(cardId) {
        return fetch(`${this._config.url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._config.headers,
        })
            .then((res) => this._getResponseData(res))
    }

    editAvatar(link) {
        return fetch(`${this._config.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._config.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then((res) => this._getResponseData(res))
    }
}
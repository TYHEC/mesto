export class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers
    }
    /** Обработка ответа сервера */
    _handlingServerResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
        };
    }
    /** Получение данных профиля */
    getUserData() {
        return fetch(`${this._url}users/me`, {
            headers: this._headers
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })


    };
    /** Загрузка начальных карточек с сервера */
    getInitialCards() {
        return fetch(`${this._url}cards`, {
            headers: this._headers
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Отправление новых данных пользователя на сервер */
    passeUserData({ name, job }) {
        return fetch(`${this._url}users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Добавление новой карточки */
    postNewCard({ name, link }) {
        return fetch(`${this._url}cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({ name, link })
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Удаление карточки */
    deleteCard(cardId) {
        return fetch(`${this._url}cards/${cardId}`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Постановка лайка карточке */
    placeCardLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT'
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Удаление лайка */
    deleteCardLike(cardId) {
        return fetch(`${this._url}cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Отправка данных аватара */
    passAvatarData({ avatar }) {
        return fetch(`${this._url}users/me/avatar`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatar })
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })

    }
};

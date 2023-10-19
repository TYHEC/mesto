export class Api{
    constructor({url, headers}){
        this._url = url;
        this._headers = headers
    }
}
const api = new Api({
    utl:"https://mesto.nomoreparties.co/v1/cohort-77/",
    headers:{
        authorization:"7838e6f3-5851-44f6-8023-4e26f5b26a5c",
        'Content-Type': 'application/json'
    }
})
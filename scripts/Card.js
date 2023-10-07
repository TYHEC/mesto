import { openPopup, zoomName, zoomPopup, zoomPhoto } from "./index.js";
class Card {
    constructor(data, templateElement) {
        this._name = data.name;
        this._image = data.link;
        this._template = templateElement;
        this._element = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);
        this._elementPhoto = this._element.querySelector('.element__photo');
        this._elementName = this._element.querySelector('.element__name');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__trash');
    }
    _likeCard = (evt) => {
        evt.target.classList.toggle('element__like_active');
    }
    _deleteCard() {
        this._element.remove();
    }
    _openZoomPhoto() {
        zoomName.textContent = this._name;
        zoomPhoto.src = this._image;
        zoomPhoto.alt = this._name;
        openPopup(zoomPopup);
    }
    createCard() {
        this._elementName.textContent = this._name;
        this._elementPhoto.src = this._image;
        this._elementPhoto.alt = this._name;
        this._setEventListeners();
        return this._element;
    }
    _setEventListeners = () => {
        this._deleteButton.addEventListener('click', evt => this._deleteCard(evt));
        this._likeButton.addEventListener('click', evt => this._likeCard(evt));
        this._elementPhoto.addEventListener('click', () => this._openZoomPhoto());

    };

};

export { Card };
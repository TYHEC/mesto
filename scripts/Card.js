import { openPopup, zoomName, zoomPopup, zoomPhoto } from "./index.js";
class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
    }
    _createCardFromTemplate() {
        this._element = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _likeCard() {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
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
        this._createCardFromTemplate();
        this._element.querySelector(".element__photo").src = this._image;
        this._element.querySelector(".element__photo").alt = this._name;
        this._element.querySelector('.element__name').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', () => { this._deleteCard() });
        this._element.querySelector('.element__like').addEventListener('click', () => { this._likeCard() });
        this._element.querySelector('.element__photo').addEventListener('click', () => { this._openZoomPhoto() });

    };

};

export { Card };
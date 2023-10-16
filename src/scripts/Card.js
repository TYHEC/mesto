class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._image = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._element.querySelector('.element__photo').addEventListener('click', () => this._handleCardClick(this._image, this._name));

    };

};

export { Card };
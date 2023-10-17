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
        this._elementLike.classList.toggle('element__like_active');
    }
    _deleteCard() {
        this._element.remove();
    }

    createCard() {
        this._createCardFromTemplate();
        this._elementPhoto = this._element.querySelector(".element__photo");
        this._elementPhoto.src = this._image;
        this._elementPhoto.alt = this._name;
        this._elementName = this._element.querySelector('.element__name');
        this._elementName.textContent = this._name;
        this._elementLike = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__trash');
        this._setEventListeners();
        return this._element;
    }
    _setEventListeners() {
        this._elementDelete.addEventListener('click', () => { this._deleteCard() });
        this._elementLike.addEventListener('click', () => { this._likeCard() });
        this._elementPhoto.addEventListener('click', () => this._handleCardClick(this._image, this._name));

    };

};

export { Card };
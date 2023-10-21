class Card {
    constructor(data, templateSelector, userId, authorData, { handleCardClick,
        handlePlaceLike, handleRemoveLike, handleTrashClick }) {
        this._userId = userId
        this._authorId = authorData.authorId;
        this._cardId = authorData.cardId;
        this._data = data;
        this._name = this._data.name;
        this._image = this._data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handlePlaceLike = handlePlaceLike;
        this._handleRemoveLike = handleRemoveLike;
    }
    _createCardFromTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }
    _isLiked() {
        return this._likeZone.find((item) => item._id === this._userId)
    }
    likeCard(data) {
        this._likeZone = data.likes;
        if (this._likeZone.length === 0) {
            this.likeCounter.textContent = '';
        } else {
            this.likeCounter.textContent = this._likeZone.length;
        }
        if (this._isLiked()) {
            this._elementLike.classList.add('element__like_active');
        } else {
            this._elementLike.classList.remove('element__like_active');
        }
    }
    _switchLike() {
        if (this._isLiked()) {
            this._handleRemoveLike(this._cardId)
        } else {
            this._handlePlaceLike(this._cardId)
        }
    }
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    createCard() {
        this._element = this._createCardFromTemplate();
        this._elementPhoto = this._element.querySelector(".element__photo");
        this._elementPhoto.src = this._image;
        this._elementPhoto.alt = this._name;
        this._elementName = this._element.querySelector('.element__name');
        this._elementName.textContent = this._name;
        this._elementLike = this._element.querySelector('.element__like');
        this._elementDelete = this._element.querySelector('.element__trash');
        this.likeCounter = this._element.querySelector('.element__like-counter');
        this.likeCard(this._data);
        this._setEventListeners();
        return this._element;
    }
    _setEventListeners = () => {
        if (this._userId === this._authorId) {
            this._elementDelete.addEventListener('click', () => this._handleTrashClick(this._element, this._cardId))
        } else {
            this._elementDelete.remove();
        };
        this._elementLike.addEventListener('click', () => this._switchLike());
        this._elementPhoto.addEventListener('click', () => this._handleCardClick(this._image, this._name));

    };

};

export { Card };
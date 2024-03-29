export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupSelector = popupSelector;
    }
    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        };
    };
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    };
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    };
    setEventListeners() {
        this._popup.addEventListener('mousedown', (e) => {
            if ((e.target.classList.contains('popup_opened'))
                ||
                (e.target.classList.contains('popup__close'))) {
                this.close();
            };
        });
    };

};
import { Popup } from "./Popup";

export class PopupAccept extends Popup {
    constructor(popupSelector, { callBackAcceptForm }) {
        super(popupSelector);
        this._callBackAcceptForm = callBackAcceptForm;
        this._acceptButton = this._popup.querySelector('.popup__submit')
    }
    open(element, cardId) {
        this._element = element;
        this._cardId = cardId;
        super.open();
    }
    setEventListeners() {
        this._acceptButton.addEventListener('submit', (e) => {
            e.preventDefault();
            this._callBackAcceptForm(this._element, this.cardId)
        })
        super.setEventListeners();
    }
}
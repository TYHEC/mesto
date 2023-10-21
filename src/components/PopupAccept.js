import { Popup } from "./Popup";

export class PopupAccept extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._acceptButton = this._popup.querySelector('.popup__form')
    }
    setEventListeners() {
        this._acceptButton.addEventListener('submit', (e) => {
            e.preventDefault();
            this._callBackAcceptForm(this._element, this.cardId)
        })
        super.setEventListeners();
    }
    accept(act) {
        this._callBackAcceptForm = act;
    }
}
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, callbackSubmitForm) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._popupInputs = [...(this._popupForm.querySelectorAll('.popup__input'))];
    };
    _getInputValues() {
        const updatedValues = {};
        this._popupInputs.forEach(inputItem => {
            updatedValues[inputItem.name] = inputItem.value;
        });
        return updatedValues;
    };
    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this._callbackSubmitForm(this._getInputValues());

        });
    };
    close() {
        super.close()
        this._popupForm.reset();
    }
}
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._ZoomPhoto = this._popup.querySelector('.popup__zoom-photo');
        this._ZoomName = this._popup.querySelector('.popup__zoom-name');
    };
    open(image, name) {
        this._ZoomPhoto.src = image;
        this._ZoomName.textContent = name;
        this._ZoomPhoto.alt = name;
        super.open();
    };
}
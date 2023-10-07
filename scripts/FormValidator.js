class FormValidator {
    constructor(config, validationElement) {
        this._config = config;
        this._validationElement = validationElement;
        this._submitButton = this._validationElement.querySelector(this._config.submitButtonSelector)
        this._inputList = [...(this._validationElement.querySelectorAll(this._config.inputSelector))];
    }
    _showError(inputElement) {
        const errorElement = this._validationElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    }
    _hideError(inputElement) {
        const errorElement = this._validationElement.querySelector(`.${inputElement.id}-error`)
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;;
        errorElement.classList.remove(this._config.errorClass);
    }
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.disabled = 'dis';
            this._submitButton.classList.add(this._config.inactiveButtonClass);
        } else {
            this._submitButton.classList.remove(this._config.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    }
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
}
export { FormValidator };
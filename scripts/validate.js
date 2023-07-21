function ShowError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
};

function HideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.remove(config.errorClass);
};

function toggleButtonState(buttonElement, isActive, config) {
  if (!isActive) {
    buttonElement.disabled = 'disabled';
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

function chekInputValidity(inputElement, formElement, config) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!isInputValid) {
    ShowError(inputElement, errorElement, config)
  } else {
    HideError(inputElement, errorElement, config)
  }

};



function setEventListener(formElement, config) {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonSelector = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButtonSelector, formElement.checkValidity(), config);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

  });

  [...inputsList].forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitButtonSelector, formElement.checkValidity(), config);
      chekInputValidity(inputItem, formElement, config);
    })
  })
}

function enableValidtation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  [...forms].forEach((formItem) => {
    setEventListener(formItem, config);
  })
}
const configFormSelector = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidtation(configFormSelector);
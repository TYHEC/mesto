function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(config.errorClass);
};

function hideError(inputElement, errorElement, config) {
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
    showError(inputElement, errorElement, config)
  } else {
    hideError(inputElement, errorElement, config)
  }

};



function setEventListener(formElement, config) {
  const inputsList = formElement.querySelectorAll(config.inputSelector);
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(submitButton, formElement.checkValidity(), config);
  formElement.addEventListener('reset', () => {
    toggleButtonState(submitButton, false, config);
  });
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

  });

  [...inputsList].forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      toggleButtonState(submitButton, formElement.checkValidity(), config);
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
const formConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidtation(formConfig);
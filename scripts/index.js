const popupElement = document.querySelector('.popup');
const closePopupButton = popupElement.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = popupElement.querySelector('.popup__input_sense_name');
const jobInput = popupElement.querySelector('.popup__input_sense_job');
const editProfile = document.querySelector('.profile__edit');
const formElement = popupElement.querySelector('.popup__form');

const openPopup = function () {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

function handlepopupSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}


editProfile.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handlepopupSubmit);








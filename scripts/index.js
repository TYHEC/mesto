const popupElemet = document.querySelector('.popup');
const closePopupButton = popupElemet.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = popupElemet.querySelector('.popup__input_sense_name');
const jobInput = popupElemet.querySelector('.popup__input_sense_job');
const editProfile = document.querySelector('.profile__edit');

const openPopup = function () {
    popupElemet.classList.add('popup_open');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

const closePopup = function () {
    popupElemet.classList.remove('popup_open');
}

const handleFormSubmit = function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}


editProfile.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
popupElemet.addEventListener('submit', handleFormSubmit);








const formElemet = document.querySelector('.popup');
const closePopupButton = formElemet.querySelector('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const nameInput = formElemet.querySelector('.popup__input_sense_name');
const jobInput = formElemet.querySelector('.popup__input_sense_job');
const editProfile = document.querySelector('.profile__edit');

const openPopup = function () {
    formElemet.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

const closePopup = function () {
    formElemet.classList.remove('popup_opened');
}

const handleFormSubmit = function (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup();
}


editProfile.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElemet.addEventListener('submit', handleFormSubmit);








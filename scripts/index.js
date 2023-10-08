import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js"
import { initialCards, validationConfig } from "./Constans.js";

const popups = document.querySelectorAll('.popup');
/* profile */
const popupProfile = document.querySelector('#profile-popup');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileNameInput = popupProfile.querySelector('#profile-name-input');
const profileJobInput = popupProfile.querySelector('#job-input');
const editProfile = document.querySelector('.profile__edit');
const formProfile = document.forms['information'];
/* cards */
const cardsSection = document.querySelector('.elements');
const addMestoIcon = document.querySelector('.profile__add-mesto');
const cardsPopup = document.querySelector('#cards-popup');
const cardNameInput = cardsPopup.querySelector('#card-name-input');
const cardLinkInput = cardsPopup.querySelector('#card-link-input');
const formCards = document.forms['newplace'];
/* zoom */
export const zoomPopup = document.querySelector('#image-popup');
export const zoomPhoto = zoomPopup.querySelector('.popup__zoom-photo');
export const zoomName = zoomPopup.querySelector('.popup__zoom-name');

/* Закртыие попап нажатием на Esc */

const closePopupPressingEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

/* Общая функция открытия попапа */

export const openPopup = function (popupType) {
  popupType.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupPressingEsc);
};

/* Закрытие попапа */

const closePopup = function (popupType) {
  popupType.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupPressingEsc);
}

/* Открытие попапа профиля */

const openPopupProfile = function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

/* Сохранение данных профиля */

function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(popupProfile);
}


editProfile.addEventListener('click', openPopupProfile);
formProfile.addEventListener('submit', handleProfileSubmit);
addMestoIcon.addEventListener('click', function () {
  openPopup(cardsPopup);
});
/** Рендер  */
const uploadCard = function (cardData, templateSelector) {
  const card = new Card(cardData, templateSelector);
  return card.createCard();
};

/* Добавление карточки пользователем */
const addNewCard = function (evt) {
  evt.preventDefault();
  cardsSection.prepend(uploadCard({
    name: cardNameInput.value,
    link: cardLinkInput.value
  }, '#element-template'));
  evt.target.reset();
  addNewCardValidator.toggleButtonState();
  closePopup(cardsPopup);
}


formCards.addEventListener('submit', addNewCard);

/* Загрузка начальных карточек */

const uploadInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsSection.append(uploadCard(card, '#element-template'));
  });
}
uploadInitialCards();

/* Закрытие любого попапа кликом на оверлей и крестик */

popups.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (e) => {
    if
      ((e.target.classList.contains('popup_opened'))
      ||
      (e.target.classList.contains('popup__close'))) {
      closePopup(popupElement);
    };
  });
});

const addNewCardValidator = new FormValidator(validationConfig, cardsPopup);
addNewCardValidator.enableValidation();
const popupProfileValidator = new FormValidator(validationConfig, popupProfile);
popupProfileValidator.enableValidation();
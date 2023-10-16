import { Card } from "../scripts/Card.js";
import { FormValidator } from "../scripts/FormValidator.js"
import {
  initialCards, validationConfig, popupProfile,
  editProfile, addMestoIcon, cardsPopup, formProfile,
  formCards, profileJobInput, profileNameInput,
} from "../scripts/Constans.js";

import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { Section } from "../scripts/Section.js";
import { UserInfo } from "../scripts/UserInfo.js";
import './index.css';

/** Зум попап */
const zoomPopup = new PopupWithImage('#image-popup');
zoomPopup.setEventListeners();
const handleCardClick = function (image, name) {
  zoomPopup.open(image, name);
}

/** Попап профиля */
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__description'
});

const editProfilePopup = new PopupWithForm('#profile-popup', () => {
  userInfo.setUserInfo(profileNameInput, profileJobInput)
  editProfilePopup.close();
});

editProfilePopup.setEventListeners();
editProfile.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  profileNameInput.value = profileData.name,
    profileJobInput.value = profileData.job
  editProfilePopup.open();
  popupProfileValidator.removeErrorWarning();
})


/** Рендер  */
const uploadCard = function (cardData) {
  const card = new Card(cardData, '#element-template', handleCardClick);
  return card.createCard();
};

/* Загрузка начальных карточек */

const uploadInitialCards = new Section({
  items: initialCards,
  renderer: (cardData) => {
    uploadInitialCards.addItem(uploadCard(cardData));
  }
}, '.elements')
uploadInitialCards.renderItems();

/* Попап добавления карточек */

const addNewCardPopup = new PopupWithForm('#cards-popup',
  updatedValues => {
    uploadInitialCards.addItem(uploadCard({
      name: updatedValues.cardname,
      link: updatedValues.cardlink
    }));
    addNewCardPopup.close();
  }
);
addNewCardPopup.setEventListeners();

/* Отырктие попапа карточек при клике*/
addMestoIcon.addEventListener('click', () => {
  addNewCardPopup.open();
  addNewCardValidator.toggleButtonState();
  addNewCardValidator.removeErrorWarning();
})


const addNewCardValidator = new FormValidator(validationConfig, formCards);
addNewCardValidator.enableValidation();
const popupProfileValidator = new FormValidator(validationConfig, formProfile);
popupProfileValidator.enableValidation();
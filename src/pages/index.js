import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js"
import {
  initialCards, validationConfig, popupProfile,
  editProfile, addMestoIcon, cardsPopup, formProfile,
  formCards, profileJobInput, profileNameInput, profileName, profileJob,
} from "../utils/Constans.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';
import { Api } from "../components/Api.js";

const api = new Api({
  utl:"https://mesto.nomoreparties.co/v1/cohort-77/",
  headers:{
      authorization:"7838e6f3-5851-44f6-8023-4e26f5b26a5c",
      'Content-Type': 'application/json'
  }
});

/** Зум попап */
const zoomPopup = new PopupWithImage('#image-popup');
zoomPopup.setEventListeners();
const handleCardClick = function (image, name) {
  zoomPopup.open(image, name);
}

/** Попап профиля */
const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userjobSelector: '.profile__description'
});

const editProfilePopup = new PopupWithForm('#profile-popup',{
  callbackSubmitForm: (profileData) =>{
    userInfo.setUserInfo({
      name: profileData.name,
      job: profileData.job
    });
    editProfilePopup.close();
  }
})

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

const addNewCardPopup = new PopupWithForm('#cards-popup',{
  callbackSubmitForm: (updatedValues) => {
    uploadInitialCards.addItem(uploadCard({
      name: updatedValues.cardname,
      link: updatedValues.cardlink
    }));
    addNewCardPopup.close();
  }
});
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
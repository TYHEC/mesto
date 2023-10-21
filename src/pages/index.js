import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js"
import {
  validationConfig, popupProfile,
  editProfile, addMestoIcon, cardsPopup, formProfile,
  formCards, profileJobInput, profileNameInput, editAvatarIcon, avatarPopup, formAvatar
} from "../utils/Constans.js";

import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';
import { Api } from "../components/Api.js";
import { PopupAccept } from "../components/PopupAccept.js";

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-77/',
  headers: {
    authorization: '7838e6f3-5851-44f6-8023-4e26f5b26a5c',
    'Content-Type': 'application/json'
  }
});
let userId;


/** Зум попап */
const zoomPopup = new PopupWithImage('#image-popup');
zoomPopup.setEventListeners();


/** Попап профиля */
const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  userjobSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

const editProfilePopup = new PopupWithForm('#profile-popup', {
  callbackSubmitForm: (profileData) => {
    editProfilePopup.changeSubmitButtonText();
    api.passeUserData(profileData)
      .then((res) => {
        userInfo.setUserInfo(res);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`При редактировании профиля произошла ошибка: ${err}`)
      })
      .finally(() => {
        editProfilePopup.resetSubmitButtonText();
      })

  }
});
editProfilePopup.setEventListeners();

editProfile.addEventListener('click', () => {
  const profileData = userInfo.getUserInfo();
  profileNameInput.value = profileData.name,
    profileJobInput.value = profileData.job
  editProfilePopup.open();
  popupProfileValidator.removeErrorWarning();
})

/** Avatar-popup */

const editAvatarPopup = new PopupWithForm('#avatar-popup', {
  callbackSubmitForm: (profileData) => {
    editAvatarPopup.changeSubmitButtonText();
    api.passAvatarData(profileData)
      .then((res) => {
        userInfo.setUserInfo(res);
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`При обновлении аватара произошла ошибка: ${err}`)
      })
      .finally(() => {
        editAvatarPopup.resetSubmitButtonText();
      })
  }
})
editAvatarPopup.setEventListeners();

editAvatarIcon.addEventListener('click', () => {
  editAvatarPopup.open();
  editAvatarPopupValidator.toggleButtonState();
  editAvatarPopupValidator.removeErrorWarning();

});

/** Accept-popup */

const acceptPopup = new PopupAccept('#delete-card-popup', {
  callBackAcceptForm: (element, cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        element.deleteCard()
        acceptPopup.close();
      })
      .catch((err) => {
        console.log(`При удалении карточки произошла ошибка: ${err}`)
      })
  }
});
acceptPopup.setEventListeners();

/** Рендер  */
const uploadCard = function (data) {
  const card = new Card(data, '#element-template', userId, {
    cardId: data._id,
    authorId: data.owner._id
  },
    {
      handleTrashClick: (element, cardId) => { acceptPopup.open(element, cardId) },
      handleCardClick: (name, image) => { zoomPopup.open(name, image) },
      handlePlaceLike: (cardId) => {
        api.placeCardLike(cardId)
          .then((data) => {
            card.likeCard(data);
          })
          .catch((err) => { console.log(`При постановке лайка произошла ошибка: ${err}`) })
      },
      handleRemoveLike: (cardId) => {
        api.deleteCardLike(cardId)
          .then((data) => {
            card.likeCard(data);
          })
          .catch((err) => { console.log(`При снятии лайка произошла ошибка: ${err}`) })
      }
    });
  return card.createCard();
};

/* Загрузка начальных карточек */

const uploadInitialCards = new Section({
  renderer: (data) => {
    uploadInitialCards.addItem(uploadCard(data));
  }
}, '.elements')

/* Попап добавления карточек */

const addNewCardPopup = new PopupWithForm('#cards-popup', {
  callbackSubmitForm: (updatedValues) => {
    addNewCardPopup.changeSubmitButtonText(),
    api.postNewCard({
      name: updatedValues.cardname,
      link: updatedValues.cardlink
    })
      .then((data) => {
        uploadInitialCards.addItem(uploadCard(data));
        addNewCardPopup.close();
      })
      .catch((err) => { console.log(`ПРи добавлении новой карточки произошла ошибка: ${err}`) })
      .finally(() => {
        addNewCardPopup.resetSubmitButtonText();
      })
  }
});
addNewCardPopup.setEventListeners();


/* Отырктие попапа карточек при клике*/
addMestoIcon.addEventListener('click', () => {
  addNewCardPopup.open();
  addNewCardValidator.toggleButtonState();
  addNewCardValidator.removeErrorWarning();
})

/** Promise all */

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([profileData, Carddata]) => {
    userId = profileData._id;
    uploadInitialCards.renderItems(Carddata);
    userInfo.setUserInfo(profileData);
  })
  .catch((err) => { console.log(`Критическая ошибка: ${err}`) })


const addNewCardValidator = new FormValidator(validationConfig, formCards);
addNewCardValidator.enableValidation();
const popupProfileValidator = new FormValidator(validationConfig, formProfile);
popupProfileValidator.enableValidation();
const editAvatarPopupValidator = new FormValidator(validationConfig, formAvatar);
editAvatarPopupValidator.enableValidation();
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
/* profile */
const popupProfile = document.querySelector('#profile-popup');
const closePopupButton = document.querySelectorAll('.popup__close');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileNameInput = popupProfile.querySelector('.popup__input_sense_name');
const profileJobInput = popupProfile.querySelector('.popup__input_sense_job');
const editProfile = document.querySelector('.profile__edit');
const formProfile = popupProfile.querySelector('.popup__form');
/* cards */
const cardsSection = document.querySelector('.elements');
const addMestoIcon = document.querySelector('.profile__add-mesto');
const cardsPopup = document.querySelector('#cards-popup');
const cardNameInput = cardsPopup.querySelector('.popup__input_sense_name');
const cardLinkInput = cardsPopup.querySelector('.popup__input_sense_job');
const formCards = cardsPopup.querySelector('.popup__form');
/* zoom */
const zoomPopup = document.querySelector('#image-popup');
const zoomPhoto = zoomPopup.querySelector('.popup__zoom-photo');
const zoomName = zoomPopup.querySelector('.popup__zoom-name');

/* Общая функция открытия попапа */

const openPopup = function (popupType) {
  popupType.classList.add('popup_opened');
}

/* Закрытие попапа */

const closePopup = function (popupType) {
  popupType.classList.remove('popup_opened');
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


/* Попап добавления карточек */

const addCards = function (name, link) {
  const CardTemplate = document.querySelector('#element-template').content;
  const cloneCardTemplate = CardTemplate.querySelector('.element').cloneNode(true);
  const cardsPhoto = cloneCardTemplate.querySelector('.element__photo');
  const cardName = cloneCardTemplate.querySelector('.element__name');

  cardName.textContent = name;
  cardsPhoto.src = link;

  /* Zoom  */
  const openZoomPhoto = function () {
    zoomName.textContent = name;
    zoomPhoto.src = link;
    openPopup(zoomPopup);
  }

  cardsPhoto.addEventListener('click', openZoomPhoto);

  /* Лайк */

  cloneCardTemplate.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  /* Удаление карточки  */

  cloneCardTemplate.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });



  return cloneCardTemplate;
}
addMestoIcon.addEventListener('click', function () {
  openPopup(cardsPopup);
});

/* Добавление карточки пользователем */

const addNewCard = function (evt) {
  evt.preventDefault();
  cardsSection.prepend(addCards(cardNameInput.value, cardLinkInput.value));
  evt.target.reset()
  closePopup(cardsPopup);
}

formCards.addEventListener('submit', addNewCard);

/* Загрузка начальных карточек */

const uploadInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsSection.append(addCards(card.name, card.link));
  });
}
uploadInitialCards();

/* Закртие любого попапа при нажатии на крестик */

closePopupButton.forEach(function (button) {
  const popupElement = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popupElement);
  });
});









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
const zoomPopup = document.querySelector('#image-popup');
const zoomPhoto = zoomPopup.querySelector('.popup__zoom-photo');
const zoomName = zoomPopup.querySelector('.popup__zoom-name');

/* Закртыие попап нажатием на Esc */

const closePopupPressingEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

/* Общая функция открытия попапа */

const openPopup = function (popupType) {
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


/* Попап добавления карточек */

const createCard = function (name, link) {
  const cardTemplate = document.querySelector('#element-template').content;
  const cloneCardTemplate = cardTemplate.querySelector('.element').cloneNode(true);
  const cardsPhoto = cloneCardTemplate.querySelector('.element__photo');
  const cardName = cloneCardTemplate.querySelector('.element__name');

  cardName.textContent = name;
  cardsPhoto.src = link;
  cardsPhoto.alt = name;

  /* Zoom  */
  const openZoomPhoto = function () {
    zoomName.textContent = name;
    zoomPhoto.src = link;
    zoomPhoto.alt = name;
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
  cardsSection.prepend(createCard(cardNameInput.value, cardLinkInput.value));
  evt.target.reset()
  closePopup(cardsPopup);
}

formCards.addEventListener('submit', addNewCard);

/* Загрузка начальных карточек */

const uploadInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsSection.append(createCard(card.name, card.link));
  });
}
uploadInitialCards();

/* Закрытие любого попапа кликом на оверлей и крестик */

popups.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    };
    if (e.target.classList.contains('popup__close')) {
      closePopup(popupElement);
    };
  });
});









import { Card } from "./card.js";
import { initialCards, validationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
const userName = document.querySelector(".profile__header");
const userJob = document.querySelector(".profile__text");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
const placeInput = document.querySelector(".popup__input_type_place");
const linkInput = document.querySelector(".popup__input_type_link");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");

const popupEditValidation = new FormValidator(validationConfig, popupEdit);
//валидируем  форму попапа редактирования данных профиля
popupEditValidation.enableValidation();
const popupAddValidation = new FormValidator(validationConfig, popupAdd);
//валидируем форму попапа добавления карточки
popupAddValidation.enableValidation();
const popupPic = document.querySelector(".popup_theme_dark");
const buttonEditClose = popupEdit.querySelector(".popup__close");
const buttonAddClose = popupAdd.querySelector(".popup__close");
const buttonPicClose = popupPic.querySelector(".popup__close");
const formEditElement = popupEdit.querySelector(".popup__form");
const formAddElement = popupAdd.querySelector(".popup__form");
const popupImage = document.querySelector(".popup__image");
const popupCapture = document.querySelector(".popup__caption");
const cardElement = document.querySelector(".elements");


// функция открытия всплывающего окна
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEscape);
}
// функция закрытия всплывающего при нажатии клавиши Escape
function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

// функция закрытия всплывающего окна
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEscape);
}
// функция сохранения изменений пользователя в окне редактирования данных профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeEditPopup();
}
// функция сохранения изменений пользователя в окне добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const inputAdd = {
    name: "",
    link: "",
  };
  inputAdd.name = placeInput.value;
  inputAdd.link = linkInput.value;
  renderCard(inputAdd);
  closeAddPopup();
}

//функция открытия окна редактирования профиля
function openEditPopup() {
  openPopup(popupEdit);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  //прячем ошибки валидации, возникшие при предыдущем открытии попапа
  popupEditValidation.hideInputError(nameInput);
  popupEditValidation.hideInputError(jobInput);
  popupEditValidation.enableSubmitButton();

}
//функция закрытия окна редактирования профиля
function closeEditPopup() {
  closePopup(popupEdit);
}
//функция открытия окна добавления карточки
function openAddPopup() {
  openPopup(popupAdd);
  //прячем ошибки валидации, возникшие при предыдущем открытии попапа
  popupAddValidation. hideInputError(placeInput);
  popupAddValidation. hideInputError(linkInput);
  formAddElement.reset();
  //disableSubmitButton(popupAdd, validationConfig);
  popupAddValidation.disableSubmitButton();
}

//функция закрытия окна добавления карточки
function closeAddPopup() {
  closePopup(popupAdd);
}

//функция открытия окна картинки переписать передавая туда параметры card.link  и card.name
function openImagePopup(card) {
  openPopup(popupPic);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCapture.textContent = card.name;
}
//функция закрытия окна картинки
function closeImagePopup() {
  closePopup(popupPic);
}
//обработчик событий кнопки открытия окна редактирования профиля
buttonEdit.addEventListener("click", openEditPopup);
//обработчик событий кнопки открытия окна добавления карточек
buttonAdd.addEventListener("click", openAddPopup);
//обработчик событий кнопки закрытия окна редактирования профиля
buttonEditClose.addEventListener("click", closeEditPopup);
//обработчик событий кнопки закрытия окна добавления карточек
buttonAddClose.addEventListener("click", closeAddPopup);
//обработчик событий кнопки закрытия окна картинки cards
buttonPicClose.addEventListener("click", closeImagePopup);
//обработчик событий кнопки сохранить окна редактирования профиля
formEditElement.addEventListener("submit", handleFormEditSubmit);
//обработчик событий кнопки сохранить окна добавления карточек
formAddElement.addEventListener("submit", handleAddFormSubmit);
//обработчик событий при клике на оверлей окна редактирования профиля
popupEdit.addEventListener("click", (evt) => {
  if (evt.target === popupEdit) {
    closeEditPopup();
  }
});
//обработчик событий при клике на оверлей окна добавления карточек
popupAdd.addEventListener("click", (evt) => {
  if (evt.target === popupAdd) {
    closeAddPopup();
  }
});
//обработчик событий при клике на оверлей окна картинки
popupPic.addEventListener("click", (evt) => {
  if (evt.target === popupPic) {
    closeImagePopup();
  }
});
//функция создание DOM элемента c использованием template-шаблона
const createElement = (card) => {
  const element = new Card(
    card,
    ".element-template",
    openImagePopup
  ).createCard();
  return element;
};

//функция добавления элемента массива initialCards на страницу в конец блока elements
const renderInitialCard = (card) => {
  cardElement.append(createElement(card));
};

//функция добавления элемента  на страницу в начало блока elements перед элементами массива initialCards
const renderCard = (card) => {
  cardElement.prepend(createElement(card));
};

//функция добавления в цикле элементов массива initialCards на страницу в конец блока elements
initialCards.forEach((initcard) => {
  renderInitialCard(initcard);
});


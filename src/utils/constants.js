const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const getDataheaders = {
  authorization: "8db76d83-4308-4ed0-aecc-97a862cc1cdd",
};
const setDataheaders = {
  authorization: "8db76d83-4308-4ed0-aecc-97a862cc1cdd",
  "Content-Type": "application/json",
};

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  activeButtonClass: "popup__submit_valid",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
};
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
export { initialCards, validationConfig, buttonEdit, buttonAdd, popupEdit, popupAdd, getDataheaders, setDataheaders};
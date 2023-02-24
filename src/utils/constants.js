const getDataHeaders = {
  authorization: "8db76d83-4308-4ed0-aecc-97a862cc1cdd",
};
const setDataHeaders = {
  authorization: "8db76d83-4308-4ed0-aecc-97a862cc1cdd",
  "Content-Type": "application/json",
};

const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-60";

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
const buttonAvatar = document.querySelector(".profile__avatar-edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupDelCard = document.querySelector(".popup_type_delete-card");
export {
  validationConfig,
  buttonEdit,
  buttonAdd,
  popupEdit,
  buttonAvatar,
  popupAdd,
  popupAvatar,
  popupDelCard,
  getDataHeaders,
  setDataHeaders,
  baseUrl,
};

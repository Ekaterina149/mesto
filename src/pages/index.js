import "../pages/index.css";
import { Card } from "../components/Card.js";
import { initialCards, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);
const popupEditPr = new PopupWithForm(".popup_type_edit", handleFormEditSubmit);
const popupPicPr = new PopupWithImage(".popup_theme_dark");
const cardlist = new Section(
  {
    renderer: (item) => cardlist.addItem(createCard(item)),
  },
  ".elements"
);
const popupAddPr = new PopupWithForm(".popup_type_add", (value) => {
  cardlist.addItem(createCard(value));
  popupAddPr.close();
});
const UserInf = new UserInfo({
  nameSelector: ".profile__header",
  jobSelector: ".profile__text",
});

buttonEdit.addEventListener("click", () => {
  popupEditPr.setInputValues(UserInf.getUserInfo());
  popupEditValidation.clearErrors();
  popupEditPr.open();
});

buttonAdd.addEventListener("click", () => {
  popupAddValidation.clearErrors();
  popupAddPr.open();
});
//валидируем  форму попапа редактирования данных профиля
popupEditValidation.enableValidation();
//валидируем форму попапа добавления карточки
popupAddValidation.enableValidation();

//функция вызываемая при сабмите окна редактирования профиля
function handleFormEditSubmit(value) {
  UserInf.SetUserInfo(value);
  popupEditPr.close();
}
function createCard(item) {
  return new Card(item, ".element-template", () =>
    popupPicPr.open(item)
  ).createCard();
}

popupPicPr.setEventListeners();
popupEditPr.setEventListeners();
popupAddPr.setEventListeners();

cardlist.renderItems(initialCards.reverse());

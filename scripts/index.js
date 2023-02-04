import { Card } from "./Card.js";
import { initialCards, validationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js"
import { PopupWithImage } from "./PopupWithImage.js"
import { PopupWithForm } from "./PopupWithForm.js";
import {UserInfo} from "./UserInfo.js"
const userName = document.querySelector(".profile__header");
const userJob = document.querySelector(".profile__text");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");



const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);


const popupEditPr = new PopupWithForm('.popup_type_edit',handleFormEditSubmit);
const popupPicPr = new PopupWithImage('.popup_theme_dark');
const cardlist = new Section (
  {
    renderer: (item) =>
    cardlist.addItem(createCard(item))
  },
  ".elements"
);
const popupAddPr = new PopupWithForm(".popup_type_add",
(value) => {
  cardlist.addItem(createCard(value))
  popupAddPr.close();
}
)
const UserInf = new UserInfo({nameSelector: ".profile__header", jobSelector: ".profile__text"});
buttonEdit.addEventListener("click", () => {
  popupEditPr.setInputValues(UserInf.getUserInfo());
  popupEditValidation.clearErrors();
  popupEditPr.open();

});
buttonAdd.addEventListener("click", () =>{
  popupAddValidation.clearErrors();
  popupAddPr.open();
} )


//валидируем  форму попапа редактирования данных профиля
popupEditValidation.enableValidation();

//валидируем форму попапа добавления карточки
popupAddValidation.enableValidation();


/* function openImagePopup(card) {
  openPopup(popupPic);
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCapture.textContent = card.name;
}
 */

function handleFormEditSubmit(value) {
  userName.textContent = value.NameInput;
  userJob.textContent = value.JobInput;
  popupEditPr.close();
}
function  createCard (item) {
  return new Card(item, ".element-template",() => popupPicPr.open(item)).createCard();

}


popupPicPr.setEventListeners();
popupEditPr.setEventListeners();
popupAddPr.setEventListeners();

  cardlist.renderItems(initialCards.reverse());

import "../pages/index.css";
import { Card } from "../components/Card.js";
import { initialCards, validationConfig, buttonEdit, buttonAdd, popupEdit, popupAdd} from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);
//переменная класса для попапа редактирования профиля
const popupEditPr = new PopupWithForm(".popup_type_edit", handleFormEditSubmit);
//переменная класса для попапа с картинкой
const popupPicPr = new PopupWithImage(".popup_theme_dark");
// создаем переменную, чтобы рендерить карточки
const cardlist = new Section(
  {
    renderer: (item) => cardlist.addItem(createCard(item)),
  },
  ".elements"
);
//создаем переменную, чтобы работать с попапом добавления карточек
const popupAddPr = new PopupWithForm(".popup_type_add", (value) => {
  cardlist.addItem(createCard(value));
  popupAddPr.close();
});
//создаем переменную для того, чтобы в дальнейшем подставлять в
//попап редактирования профиля данные со страницы, и наоборот
//при сабмите попапа редактирования профиля подставлять данные из инпутов
//в контент элементов страницы
const UserInf = new UserInfo({
  nameSelector: ".profile__header",
  jobSelector: ".profile__text",
});
//ставим обработчик событий на кнопку редактирования профиля
buttonEdit.addEventListener("click", () => {
  popupEditPr.setInputValues(UserInf.getUserInfo());
  popupEditValidation.clearErrors();
  popupEditPr.open();
});
//ставим обработчик событий на кнопку добавления карточки
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
  UserInf.setUserInfo(value);
  popupEditPr.close();
}
//функция создания карточки
function createCard(item) {
  return new Card(item, ".element-template", () =>
    popupPicPr.open(item)
  ).createCard();
}
//ставим обработчики событий на все модальные окна (закрытие и сабмит)
popupPicPr.setEventListeners();
popupEditPr.setEventListeners();
popupAddPr.setEventListeners();
//рендерим карточки, данные которых хранятся в массиве initialCard и
//и располагаем их в обратном порядке
cardlist.renderItems(initialCards.reverse());

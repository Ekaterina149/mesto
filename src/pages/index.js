import "../pages/index.css";
import { Card } from "../components/Card.js";
import {
  validationConfig,
  buttonEdit,
  buttonAdd,
  buttonAvatar,
  popupEdit,
  popupAdd,
  popupAvatar,
  popupDelCard,
  getDataheaders,
  setDataheaders,
} from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

// создаем переменную, чтобы рендерить карточки
const cardlist = new Section(
  {
    renderer: (item) => cardlist.addItem(createCard(item)),
  },
  ".elements"
);
//создаем экземпляр класса для того, чтобы в дальнейшем подставлять в
//попап редактирования профиля данные со страницы, и наоборот
//при сабмите попапа редактирования профиля подставлять данные из инпутов
//в контент элементов страницы
//а также устанавливать в верстку данные, полученные с сервера

const UserInf = new UserInfo({
  nameSelector: ".profile__header",
  jobSelector: ".profile__text",
  avatarSelector: ".profile__avatar",
});
//создаем экземпляр класса для работы с сервером
const api = new Api();
//создаем экземпляры классов для валидации форм и работы скнопками
const popupAddValidation = new FormValidator(validationConfig, popupAdd);
const popupEditValidation = new FormValidator(validationConfig, popupEdit);
const popupAvatarValidation = new FormValidator(validationConfig, popupAvatar);
const popupDelCardValidation = new FormValidator(
  validationConfig,
  popupDelCard
);
//переменная класса для попапа редактирования профиля
const popupEditPr = new PopupWithForm(".popup_type_edit", handleFormEditSubmit);
//переменная класса для попапа с картинкой
const popupPicPr = new PopupWithImage(".popup_theme_dark");

//создаем переменную, чтобы работать с попапом добавления карточек
const popupAddPr = new PopupWithForm(".popup_type_add", (value) => {
  //подготавливаем данные для отправки на сервер
  const { name, link } = value;
  const owner = { _id: UserInf.getUserId() };
  //меняем вид кнопки сабмита во время отправки данных на
  //сервер
  const defaultText = ChangeLoadingview(popupAddValidation);
  console.log(defaultText);
  //вызываем  метод отправки данных пользователя на сервер
  api
    .setData(
      "https://mesto.nomoreparties.co/v1/cohort-60/cards",
      "POST",
      setDataheaders,
      { name, link, owner }
    )
    .then((data) => {
      // добавляем карточку в верстку, используя данные ответа с сервера
      cardlist.addItem(createCard(data));
      popupAddPr.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //возвращаем кнопке сабмита прежний вид
      Restoreview(popupAddValidation, defaultText);
    });
});
const popupAvatarPr = new PopupWithForm(".popup_type_avatar", (value) => {
  //меняем вид кнопки сабмита во время отправки данных на
  //сервер
  const defaultText = ChangeLoadingview(popupAvatarValidation);
  //отправляем на сервер данные с новой аватаркой
  api
    .setData(
      "https://mesto.nomoreparties.co/v1/cohort-60/users/me/avatar",
      "PATCH",
      setDataheaders,
      value
    )
    .then((data) => {
      //заполняем данные на сайте тем,
      //что получили в ответе с сервера
      UserInf.setUserInfo({
        nameInput: data.name,
        jobInput: data.about,
        avatar: data.avatar,
      });
      popupAvatarPr.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //возвращаем кнопке сабмита прежний вид
      Restoreview(popupAvatarValidation, defaultText);
    });
});
//создаем экземпляр класса PopupConfirm для попапа удаления карточки
const popupDelCardPr = new PopupWithConfirmation(".popup_type_delete-card");

//функция вызываемая при сабмите окна редактирования профиля
function handleFormEditSubmit(value) {
  //меняем вид кнопки сабмита во время отправки данных на
  //сервер
  const defaultText = ChangeLoadingview(popupEditValidation);
  const { nameInput: name, jobInput: about } = value;
  //отправляем данные пользователя на сервер
  api
    .setData(
      "https://mesto.nomoreparties.co/v1/cohort-60/users/me",
      "PATCH",
      setDataheaders,
      { name, about }
    )
    .then((data) => {
      UserInf.setUserInfo({
        nameInput: data.name,
        jobInput: data.about,
        avatar: data.avatar,
      });
      popupEditPr.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //возвращаем кнопке сабмита прежний вид
      Restoreview(popupEditValidation, defaultText);
    });
}
//функция создания карточки
function createCard(item) {
  return new Card({
    data: item,
    templateSelector: ".element-template",
    //коллбэк открытия попапа с картинкой
    openImgPopup: () => popupPicPr.open(item),
    //коллбэк лайка в качестве параметра handlresult выступает функция
    // см Card.js 84-87
    HandleLike: (ease, cardId, handlresult) => {
      //отправляем, либо удаляем данные с лайком если
      //пользователь лайкнул карточку в зависимости от состояния переменной ease
      api
        .setData(
          `https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}/likes`,
          ease ? "PUT" : "DELETE",
          setDataheaders
        )
        .then((data) => handlresult(data)) //вызываем функцию handlresult с данными, полученными с сервера
        .catch((err) => {
          console.log(err);
        });
    },
    //коллбэк удаления карточки
    Handledeletecard: (cardId, card) => {
      //вызываем метод updateSubmitHandler, его параметр функция

      popupDelCardPr.updateSubmitHandler(() => {
        //меняем вид кнопки сабмита во время отправки данных на
        //сервер
        const defaultText = ChangeLoadingview(popupDelCardValidation);

        //записываем на сервер удаление карточки
        api
          .setData(
            `https://mesto.nomoreparties.co/v1/cohort-60/cards/${cardId}`,
            "DELETE",
            setDataheaders
          )
          .then(() => {
            card.remove();
            card = null;
            popupDelCardPr.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            //возвращаем кнопке прежний вид
            Restoreview(popupDelCardValidation, defaultText);
          });
      });
      popupDelCardPr.open();
    },
    //передаем данные id пользователя в экземпляре класса Card
    userId: UserInf.getUserId(),
  }).createCard();
}
//функция изменения вида кнопки сабмита во время работы с сервером
function ChangeLoadingview(popup) {
  const defaultText = popup.changeButtonText("Сохранение...");
  popup.disableSubmitButton();
  return defaultText;
}
//функция  возвращения сабмита в прежнее состояние
function Restoreview(popup, defaultText) {
  popup.changeButtonText(defaultText);
  popup.enableSubmitButton();
}

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
//ставим обработчик событий на кнопку замены аватарки
buttonAvatar.addEventListener("click", () => {
  popupAvatarValidation.clearErrors();
  popupAvatarPr.open();
});
//ставим обработчики событий на все модальные окна (закрытие и сабмит)
popupPicPr.setEventListeners();
popupEditPr.setEventListeners();
popupAddPr.setEventListeners();
popupAvatarPr.setEventListeners();
popupDelCardPr.setEventListeners();
//запрашиваем данные с карточками и информацией пользователя с сервера
Promise.all([
  api.getData(
    "https://mesto.nomoreparties.co/v1/cohort-60/users/me",
    getDataheaders
  ),
  api.getData(
    "https://mesto.nomoreparties.co/v1/cohort-60/cards",
    getDataheaders
  ),
])
  .then(([userData, cardData]) => {
    UserInf.setUserInfo({
      nameInput: userData.name,
      jobInput: userData.about,
      avatar: userData.avatar,
      userId: userData._id,
    });
    cardlist.renderItems(cardData.reverse());
  })
  .catch((error) => {
    console.log(error);
  });

//валидируем  форму попапа редактирования данных профиля
popupEditValidation.enableValidation();
//валидируем форму попапа добавления карточки
popupAddValidation.enableValidation();
//валидируем форму попапа редактирования аватарки
popupAvatarValidation.enableValidation();

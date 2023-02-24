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
  getDataHeaders,
  setDataHeaders,
  baseUrl,
} from "../utils/constants.js";
import { Api } from "../components/Api.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
//const headers = "users/me/avatar";

//console.log(baseUrl + headers);
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

const userInf = new UserInfo({
  nameSelector: ".profile__header",
  jobSelector: ".profile__text",
  avatarSelector: ".profile__avatar",
});
//создаем экземпляр класса для работы с сервером
const api = new Api(baseUrl);
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
  const owner = { _id: userInf.getUserId() };
  //меняем вид кнопки сабмита во время отправки данных на
  //сервер
  const defaultText = сhangeLoadingView(popupAddValidation);
  console.log(defaultText);
  //вызываем  метод отправки данных пользователя на сервер
  api
    .setData("/cards", "POST", setDataHeaders, { name, link, owner })
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
      restoreView(popupAddValidation, defaultText);
    });
});
const popupAvatarPr = new PopupWithForm(".popup_type_avatar", (value) => {
  //меняем вид кнопки сабмита во время отправки данных на
  //сервер
  const defaultText = сhangeLoadingView(popupAvatarValidation);
  //отправляем на сервер данные с новой аватаркой
  api
    .setData("/users/me/avatar", "PATCH", setDataHeaders, value)
    .then((data) => {
      //заполняем данные на сайте тем,
      //что получили в ответе с сервера
      userInf.setUserInfo({
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
      restoreView(popupAvatarValidation, defaultText);
    });
});
//создаем экземпляр класса PopupConfirm для попапа удаления карточки
const popupDelCardPr = new PopupWithConfirmation(".popup_type_delete-card");

//функция вызываемая при сабмите окна редактирования профиля
function handleFormEditSubmit(value) {
  //меняем вид кнопки сабмита во время отправки данных на
  //сервер
  const defaultText = сhangeLoadingView(popupEditValidation);
  const { nameInput: name, jobInput: about } = value;
  //отправляем данные пользователя на сервер
  api
    .setData("/users/me", "PATCH", setDataHeaders, { name, about })
    .then((data) => {
      userInf.setUserInfo({
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
      restoreView(popupEditValidation, defaultText);
    });
}
//функция создания карточки
function createCard(item) {
  const newcard = new Card({
    data: item,
    templateSelector: ".element-template",
    //коллбэк открытия попапа с картинкой
    openImgPopup: () => popupPicPr.open(item),
    //коллбэк лайка в качестве параметра handlResult выступает функция
    // см Card.js 84-87
    handleLike: (ease, cardId, handlResult) => {
      //отправляем, либо удаляем данные с лайком если
      //пользователь лайкнул карточку в зависимости от состояния переменной ease
      api
        .setData(
          `/cards/${cardId}/likes`,
          ease ? "PUT" : "DELETE",
          setDataHeaders
        )
        .then((data) => handlResult(data)) //вызываем функцию handlResult с данными, полученными с сервера
        .catch((err) => {
          console.log(err);
        });
    },
    //коллбэк удаления карточки
    handleDeleteCard: (cardId) => {
      //вызываем метод updateSubmitHandler, его параметр функция

      popupDelCardPr.updateSubmitHandler(() => {
        //меняем вид кнопки сабмита во время отправки данных на
        //сервер
        const defaultText = сhangeLoadingView(popupDelCardValidation);

        //записываем на сервер удаление карточки
        api
          .setData(`/cards/${cardId}`, "DELETE", setDataHeaders)
          .then(() => {
            newcard.deleteCard();
            popupDelCardPr.close();
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            //возвращаем кнопке прежний вид
            restoreView(popupDelCardValidation, defaultText);
          });
      });
      popupDelCardPr.open();
    },
    //передаем данные id пользователя в экземпляре класса Card
    userId: userInf.getUserId(),
  });
  return newcard.createCard();
}
//функция изменения вида кнопки сабмита во время работы с сервером
function сhangeLoadingView(popup) {
  const defaultText = popup.changeButtonText("Сохранение...");
  popup.disableSubmitButton();
  return defaultText;
}
//функция  возвращения сабмита в прежнее состояние
function restoreView(popup, defaultText) {
  popup.changeButtonText(defaultText);
  popup.enableSubmitButton();
}

//ставим обработчик событий на кнопку редактирования профиля
buttonEdit.addEventListener("click", () => {
  popupEditPr.setInputValues(userInf.getUserInfo());
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
  api.getData("/users/me", getDataHeaders),
  api.getData("/cards", getDataHeaders),
])
  .then(([userData, cardData]) => {
    userInf.setUserInfo({
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

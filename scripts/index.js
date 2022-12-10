let userName = document.querySelector('.profile__header');
let userJob = document.querySelector('.profile__text');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let placeInput = document.querySelector('.popup__input_type_place');
let linkInput = document.querySelector('.popup__input_type_link');

let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popup = document.querySelectorAll('.popup');
let closeButton = document.querySelectorAll('.popup__close');
let formElement = document.querySelectorAll('.popup__form');


const cardElements = document.querySelector('.elements');
//const templateElement = document.querySelector('#element').content;
const template = document.querySelector('#element');

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

function openPopup(p) {

  p.classList.add('popup_opened');

}

function closePopup(p) {

  p.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {

  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closeEditPopup();

}

function handleAddFormSubmit (evt) {

  evt.preventDefault();
  const inputAdd = {
    name: '',
    link: ''
  };
  inputAdd.name = placeInput.value;
  inputAdd.link = linkInput.value;
  renderBtnAddElement(inputAdd);
  closeAddPopup();

}


 function openEditPopup() {
  openPopup(popup[0]);
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
 }

 function closeEditPopup() {
  closePopup(popup[0]);
 }

 function openAddPopup() {
  openPopup(popup[1]);
   placeInput.value = '';
   linkInput.value = '';


 }
 function closeAddPopup() {
  closePopup(popup[1]);
 }


//обработчик событий кнопки открытия окна редактирования профиля
editButton.addEventListener('click', openEditPopup);
//обработчик событий кнопки открытия окна добавления карточек
addButton.addEventListener('click', openAddPopup);
//обработчик событий кнопки закрытия окна редактирования профиля
closeButton[0].addEventListener('click', closeEditPopup);
//обработчик событий кнопки закрытия окна добавления карточек
closeButton[1].addEventListener('click', closeAddPopup);
//обработчик событий кнопки сохранить окна редактирования профиля
formElement[0].addEventListener('submit', handleFormSubmit);
//обработчик событий кнопки сохранить окна добавления карточек
formElement[1].addEventListener('submit', handleAddFormSubmit);




const createElement = (cards) => {
  //клонируем шаблон из верстки
  const element = template.content.querySelector('.element').cloneNode(true);
  //создаем в DOM объекты свойств картинки и текстового наполнения
  //карточки, присваиваем им значения из заданного массива
  // либо из ключей объекта, созданного на основе полей формы
  element.querySelector('.element__image').src = cards.link;
  element.querySelector('.element__image').alt = cards.name;
  element.querySelector('.element__text').textContent = cards.name;
  //обработчик событий кнопки корзина
  element
    .querySelector(".element__recyclebin")
    .addEventListener("click", () => {
      element.remove()
    });
    //обработчик событий кнопки лайк запущен
    element.querySelector('.element__heart').addEventListener(
      "click", (evt) => {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('element__heart_type_active');
      });

 return element;
}

//функция добавления элемента массива initialCards на страницу в конец блока elements
const renderElement = (cards) => {
  cardElements.append(createElement(cards));

}

//функция добавления элемента  на страницу в начало блока elements перед элементами массива initialCards
const renderBtnAddElement = (cards) => {
  cardElements.prepend(createElement(cards));

}

//функция добавления в цикле элементов массива initialCards на страницу в конец блока elements
initialCards.forEach((initcard) => {
  renderElement(initcard);
});

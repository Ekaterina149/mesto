let userName = document.querySelector('.profile__header');
let userJob = document.querySelector('.profile__text');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popup = document.querySelectorAll('.popup');
let closeButton = document.querySelectorAll('.popup__close');
let formElement = document.querySelector('.popup__container');
const inputAdd = [{}];

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
  inputAdd.push({
    name: nameInput.value,
    link: jobInput.value
   });
   createElement(inputAdd);
   console.log (inputAdd);

 }
 function closeAddPopup() {
  closePopup(popup[1]);
 }



editButton.addEventListener('click', openEditPopup);
closeButton[0].addEventListener('click', closeEditPopup);
closeButton[1].addEventListener('click', closeAddPopup);
formElement[0].addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', openAddPopup);



const createElement = (cards) => {
  const element = template.content.querySelector('.element').cloneNode(true);
  element.querySelector('.element__image').src = cards.link;
  element.querySelector('.element__image').alt = cards.name;
  element.querySelector('.element__text').textContent = cards.name;
 return element;
}
const renderElement = (cards) => {
  cardElements.append(createElement(cards));

}

initialCards.forEach((initcard) => {
  renderElement(initcard);
});

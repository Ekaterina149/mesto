let userName = document.querySelector('.profile__header');
let userJob = document.querySelector('.profile__text');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');

function openPopup() {

  popup.classList.add('popup_opened');
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
}

function closePopup() {

  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {

  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();

}
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);




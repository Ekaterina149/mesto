let userName = document.querySelector('.profile__header');
let userJob = document.querySelector('.profile__text');
let NameInput = document.querySelector('.popup__input_type_name');
let JobInput = document.querySelector('.popup__input_type_job');
let EditButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let CloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__container');

function PopupOpen() {

  popup.classList.add('popup_opened');
  NameInput.placeholder = userName.textContent;
  JobInput.placeholder = userJob.textContent;
  NameInput.value = userName.textContent;
  JobInput.value = userJob.textContent;
}

EditButton.addEventListener('click', PopupOpen);


function PopupClose() {

  popup.classList.remove('popup_opened');
}
CloseButton.addEventListener('click', PopupClose);


function handleFormSubmit (evt) {

  evt.preventDefault();
  userName.textContent = NameInput.value;
  userJob.textContent = JobInput.value;
  PopupClose();

}
formElement.addEventListener('submit', handleFormSubmit);




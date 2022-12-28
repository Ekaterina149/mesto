function showInputError(formElement, inputElement, errormessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(config.errorClass);
  if (errormessage !== ""){

    errorElement.textContent = errormessage;
  }
  else {
  errorElement.textContent = inputElement.validationMessage;}
  inputElement.classList.add(config.inputErrorClass);
}


function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
}
function checknumberValidity (inputElement) {
  let it = 0;
  let message = "";
  for (let i = 0; i < 10; i++) {
    let a = String(i);

    if((inputElement.type === "text") && (inputElement.value.includes(a))) {
      message = "В поле не допускается вводить числа";
      it = it + 1;
      console.log(it);
      console.log(inputElement.validity.valid);

    }

    if (it !== 0) break;

  }
  return message;
}

function checkInputValidity(formElement, inputElement, config) {

  let errormessage = checknumberValidity (inputElement);
  //console.log(errormessage);
  if (inputElement.validity.valid) {
    if (errormessage === "В поле не допускается вводить числа") {
    showInputError(formElement, inputElement, errormessage, config);
    }
    else {
    hideInputError(formElement, inputElement, config);
    }
  }
  else {
    showInputError(formElement, inputElement, errormessage, config);

  }
  return errormessage;
}
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);

}

function toggleButtonState(inputList, buttonElement, message, config) {
 //let val = message.some( function (ermessage) { return ermessage !== ""; } );
  if ((hasInvalidInput(inputList))) {
    buttonElement.classList.remove(config.activeButtonClass);
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
    //console.log(message);
  } else if (message ==="") {
    buttonElement.classList.add(config.activeButtonClass);
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  let errormessage = "";
  toggleButtonState(inputList, buttonElement, errormessage, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      errormessage = checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, errormessage, config);

    });
  })
}
function enableValidation({ formSelector, ...restConfig }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  });
}

function disableSubmButton(popup, config) {
  const buttonSave = popup.querySelector(config.submitButtonSelector);
  if (buttonSave) {
    buttonSave.classList.remove(config.activeButtonClass);
    buttonSave.classList.add(config.inactiveButtonClass);
    buttonSave.disabled = true;
  }
}

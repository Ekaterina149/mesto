//функция присваивает элементу <span> класс popup__input-error, придает элементу <input>
//класс popup__input_type_error
function showInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
}

//функция удаляет  элементу <span> класс popup__input-error, придает элементу <input>
//класс popup__input_type_error
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
  inputElement.classList.remove(config.inputErrorClass);
}
//функция проверяет наличие свойства validity.valid у элемента <input> и показывает, либо
//удаляет ошибку
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(
        'Вводите буквы русского или латинского алфавита, не используйте символы %,:,&,?,*,+,"'
      );
    } else if (!inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity("");
    }

    showInputError(formElement, inputElement, config);
  }
}
//функция находит и возвращает невалидный инпут в массиве из элементов <input>
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}
//функция переключает состояние кнопки Submit в неактивное состояние,
//если находит в массиве <input>-ов невалидный, либо возвращает кнопку Submit
//в активное состояние, если все <input>-ты валидны
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(config.activeButtonClass);
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.add(config.activeButtonClass);
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}
//функция создает обработчики состояния  <input>-ов из массива <input>-ов, следит за
//валидностью, переключает состояние кнопок Submit в форме
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("keyup", (evt) => {
      if (evt.key === "Backspace") {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      }
    });
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}
//функция создает обработчики событий для всех форм на странице
function enableValidation({ formSelector, ...restConfig }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, restConfig);
  });
}
//функция активации кнопки Submit
function anableSubmitButton(popup, config) {
  const buttonSave = popup.querySelector(config.submitButtonSelector);
  if (buttonSave) {
    buttonSave.classList.remove(config.inactiveButtonClass);
    buttonSave.classList.add(config.activeButtonClass);
    buttonSave.disabled = false;
  }
}

function disableSubmitButton(popup, config) {
  const buttonSave = popup.querySelector(config.submitButtonSelector);
  if (buttonSave) {
    buttonSave.classList.add(config.inactiveButtonClass);
    buttonSave.classList.remove(config.activeButtonClass);
    buttonSave.disabled = true;
  }
}

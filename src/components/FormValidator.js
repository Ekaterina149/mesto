class FormValidator {
  constructor(restconfig, formElement) {
    this._restconfig = restconfig;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(
      this._restconfig.submitButtonSelector
    );
    this._inputlist = Array.from(
      this._formElement.querySelectorAll(restconfig.inputSelector)
    );
  }
  //запустить валидацию
  enableValidation = () => {
    this._setEventListeners();
  };
  //показать ошибку валидации
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.add(this._restconfig.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._restconfig.inputErrorClass);
  };
  //скрыть ошибку валидации
  hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this._restconfig.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._restconfig.inputErrorClass);
  };
  //проверка на валидность инпутов
  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this.hideInputError(inputElement);
    } else {
      if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(
          'Вводите буквы русского или латинского алфавита, не используйте символы %,:,&,?,*,+,"'
        );
      } else if (!inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity("");
      }

      this._showInputError(inputElement);
    }
  };
  //находим невалидный инпут в массиве инпутов
  _hasInvalidInput() {
    return this._inputlist.some((inputElement) => !inputElement.validity.valid);
  }
  //деактивация кнопки сабмит
  disableSubmitButton = () => {
    this._buttonElement.classList.remove(this._restconfig.activeButtonClass);
    this._buttonElement.classList.add(this._restconfig.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };
  //активация кнопки сабмит
  enableSubmitButton = () => {
    this._buttonElement.classList.add(this._restconfig.activeButtonClass);
    this._buttonElement.classList.remove(this._restconfig.inactiveButtonClass);
    this._buttonElement.disabled = false;
  };
  //переключение состояния кнопки сабмит
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  };
  //установка слушателей событий
  _setEventListeners = () => {
    this._toggleButtonState(this._inputlist, this._buttonElement);
    this._inputlist.forEach((inputElement) => {
      inputElement.addEventListener("keyup", (evt) => {
        if (evt.key === "Backspace") {
          this._checkInputValidity(inputElement);
          this._toggleButtonState(this._inputlist, this._buttonElement);
        }
      });
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._inputlist, this._buttonElement);
      });
    });
  };
  // метод очищает ошибки при открытии попапа
  clearErrors() {
    this._inputlist.forEach((input) => {
      this.hideInputError(input);
    });
    this._toggleButtonState();
  }
  //метод меняет текст кнопки в момент загрузки данных на сервер
  changeButtonText(text) {
    const defaultText = this._buttonElement.textContent;
    this._buttonElement.textContent = text;
    return defaultText;
  }
  _getDefaultButtonText() {
    return this._buttonElement.textContent;
  }
}

export { FormValidator };

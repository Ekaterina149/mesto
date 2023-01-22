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
  enableValidation = () => {
    this._setEventListeners();
  };
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.add(this._restconfig.errorClass);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._restconfig.inputErrorClass);
  };
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    errorElement.classList.remove(this._restconfig.errorClass);
    errorElement.textContent = "";
    inputElement.classList.remove(this._restconfig.inputErrorClass);
  };
  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
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
  _hasInvalidInput() {
    console.log(this);
    return this._inputlist.some((inputElement) => !inputElement.validity.valid);
  }
  disableSubmitButton = () => {
    this._buttonElement.classList.remove(this._restconfig.activeButtonClass);
    this._buttonElement.classList.add(this._restconfig.inactiveButtonClass);
    this._buttonElement.disabled = true;
  };
  enableSubmitButton = () => {
    this._buttonElement.classList.add(this._restconfig.activeButtonClass);
    this._buttonElement.classList.remove(this._restconfig.inactiveButtonClass);
    this._buttonElement.disabled = false;
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
  };
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
}

export { FormValidator };

import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, HandleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = HandleFormSubmit;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
  }
  getForm() {
    return this._form;
  }
  close() {
    super.close();
    this._form.reset();
  };
  getInputValues = () => {
    this._inputvalues = new Object();
    this._inputs.forEach((input) => {
    this._inputvalues[input.name] = input.value;
    });
    return this._inputvalues;
  };
  setInputValues = (values) => {
    this._inputs.forEach((input) => { input.value = values[input.name] })
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  };

}
export { PopupWithForm };

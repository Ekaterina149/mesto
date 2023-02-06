import { Popup } from "./Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, HandleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleFormSubmit = HandleFormSubmit;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'))
  }
  //метод возвращает форму
  getForm() {
    return this._form;
  }
  //метод закрывает форму и сбрасывает ее поля
  close() {
    super.close();
    this._form.reset();
  };
  //метод получает объект со значениями инпутов из массива инпутов в виде
  //{ input.name1: input.value1 input.name2: input.value2 input.name3: input.value3 ... }
  getInputValues = () => {
    this._inputvalues = new Object();
    this._inputs.forEach((input) => {
    this._inputvalues[input.name] = input.value;
    });
    return this._inputvalues;
  };
  //метод заполняет данные инпутов значениями, полученными из метода getUserInfo() класса UserInfo
  setInputValues = (values) => {
    this._inputs.forEach((input) => { input.value = values[input.name] })
  }
//метод устанавливает дополнительные слушатели событий на сабмит формы
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
    });
  };

}
export { PopupWithForm };

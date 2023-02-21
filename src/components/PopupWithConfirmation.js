import { Popup } from "./Popup.js";

class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__submit");
  }
  //метод внешний вызывается в index.js  и получает в качестве параметра функцию
  //см. index.js строка 149 и присваивает ее свойству   this._handleSubmit
  updateSubmitHandler(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    //установка слушателя событий на кнопку согласия
    //удаления карточки
    this._button.addEventListener("click", () => {
      //свойство срабатывает при клике на кнопку
      this._handleSubmit();
    });
  }
}
export { PopupWithConfirmation };

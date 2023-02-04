class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

  }
  open() {
    this._popup.classList.add("popup_opened");
    console.log(this._popup.classList);
    this._handleEscClose();
  };
  close() {
    this._popup.classList.remove("popup_opened");
    this._removehandleEscClose();
  };
  _closeOnEscape = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  _handleEscClose = () => {
    document.addEventListener("keydown", (evt) => {
      this._closeOnEscape(evt);
    });
  };
  _removehandleEscClose = () => {
    document.removeEventListener("keydown", (evt) => {
      this._closeOnEscape(evt);
    });
  };
  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          this.close();
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close();
      }
  });
  }
}
export {Popup};

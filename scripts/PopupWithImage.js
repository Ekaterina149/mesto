import { Popup } from './Popup.js'
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__caption');
  }
  open = (card) => {

    this._image.src = card.link;
    this._image.alt = card.name;
    this._title.textContent = card.name;
    super.open();
  };
}
export {PopupWithImage};

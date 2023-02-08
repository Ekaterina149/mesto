class Card {
  constructor(data, templateSelector, openImgPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImgPopup = openImgPopup;
  }
//создание карточки
  createCard = () => {
    this._card = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    this._element = this._card.querySelector(".element");
    this._title = this._card.querySelector(".element__text");
    this._image = this._card.querySelector(".element__image");
    this._heart = this._card.querySelector(".element__heart");
    this._resyclebin = this._card.querySelector(".element__recyclebin");
    this._fillCard();
    this._setEventListeners();

    return this._card;
  };
//заполнение карточки
  _fillCard = () => {
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;

  };
  //переключение класса видимости у карточки
  _toggleHeart = () => {
    this._heart.classList.toggle("element__heart_type_active");
  };
  //удаление карточки
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  };
  //установка слушателей событий
  _setEventListeners = () => {
    this._heart.addEventListener("click", () =>{ this._toggleHeart()});
    this._resyclebin.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener("click", () => {
    this._openImgPopup({name: this._name, link: this._link});}
    );
  };
}

export { Card };

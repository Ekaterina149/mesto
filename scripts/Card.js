class Card {
  constructor(data, templateSelector, openImgPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImgPopup = openImgPopup;
  }

  createCard = () => {
    this._card = document
      .querySelector(this._templateSelector)
      .content.cloneNode(true);
    console.log(this._card);
    this._title = this._card.querySelector(".element__text");
    this._image = this._card.querySelector(".element__image");
    this._heart = this._card.querySelector(".element__heart");
    this._resyclebin = this._card.querySelector(".element__recyclebin");
    this._fillCard(); //заполнение карточки
    this._setEventListeners();

    return this._card;
  };

  _fillCard = () => {
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    //здесь я закончу заполнение карточки;
  };
  _toggleHeart = () => {
    this._heart.classList.toggle("element__heart_type_active");
  };
  _deleteCard = () => {
    this._resyclebin.closest(".element").remove();
  };
  _setEventListeners = () => {
    this._heart.addEventListener("click", () =>{ this._toggleHeart()});
    this._resyclebin.addEventListener("click", () => this._deleteCard());
    this._image.addEventListener("click", () => {
      const img = {
        name: this._name,
        link: this._link,
      };
      this._openImgPopup(img);}
    );
  };
}

export { Card };

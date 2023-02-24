class Card {
  constructor({
    data,
    templateSelector,
    openImgPopup,
    handleLike,
    handleDeleteCard,
    userId,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.owner._id;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._openImgPopup = openImgPopup;
    this._likes = data.likes;
    this._handleLike = handleLike;
    this._handleDeleteCard = handleDeleteCard;
    this._userId = userId;
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
    this._like_amount = this._card.querySelector(".element__likes-amount");
    this._fillCard();

    this._setEventListeners();
    if (this._id !== this._userId) {
      this._resyclebin.classList.add("element__recyclebin_show_not");
    }
    return this._card;
  };
  //метод возвращает trueб если в массиве лайков есть лайк пользователя
  _searchLikes() {
    return (
      this._likes.find((element) => element._id === this._userId) !== undefined
    );
  }
  //заполнение карточки
  _fillCard = () => {
    this._title.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
    this._like_amount.textContent = this._likes.length;
    //метод переключает сердечко в состояние
    //в зависимости от ставил ли уже пользователь лайк
    this._toggleHeart(this._searchLikes());
  };
  //переключение класса видимости у сердечка
  _toggleHeart = (ease) => {
    this._isliked = ease;
    //если карточка лайкнута пользователем закрась сердечко
    if (ease) {
      this._heart.classList.add("element__heart_type_active");
    }
    // если карточка не лайкнута пользователем, убери закрашивание
    else this._heart.classList.remove("element__heart_type_active");
  };
  deleteCard = () => {
    this._targetCard.remove();
    this._targetCard = null;
  };
  //установка слушателей событий
  _setEventListeners = () => {
    //ставим слушатель событий на лайк
    //в вызов метода this._handleLike передаем
    //параметры: обратный состоянию  this._isliked, т.к.
    //метод _toggleHeart  уже сработал при заполнении карточки,
    //id карточки и функцию, которая заполняет массив данных
    //лайков и заполняет карточку тоже как параметр метода this._handleLike
    this._heart.addEventListener("click", () => {
      this._handleLike(!this._isliked, this._cardId, (data) => {
        this._likes = data.likes;
        this._fillCard();
      });
    });
    // ставим слушатель на корзину
    this._resyclebin.addEventListener("click", (evt) => {
      //метод которому присвоена функция Handledeletecard
      //вызывается с параметром this._cardId
      this._targetCard = evt.target.closest(".element");
      this._handleDeleteCard(this._cardId);
    });
    //слушатель на клик по картинке карточки
    this._image.addEventListener("click", () => {
      this._openImgPopup({ name: this._name, link: this._link });
    });
  };
}

export { Card };

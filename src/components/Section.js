class Section {
  constructor({renderer }, containerSelector) {

    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
//добавляет элемент на страницу
  addItem = (element) => {
    this._container.prepend(element);
  };
//рендерит элементы из массива на страницу
  renderItems = (items) => {
  items.forEach((item) => {
      this._renderer(item);
    });
  };
}

export { Section };

class Api {
  constructor() {}
  //Метод возвращает промисс из ответа сервера
  //в случае ошибки возвращает ее код и текст ошибки
  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }
  //метод берет данные с сервера
  getData(href, headers) {
    return fetch(href, { headers: headers }).then(this._checkRes);
  }
  //метод записывает данные на сервер
  setData(href, method, headers, bodyObject) {
    return fetch(href, {
      method: method,
      headers: headers,
      body: bodyObject ? JSON.stringify(bodyObject) : "",
    }).then(this._checkRes);
  }
}
export { Api };

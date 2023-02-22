class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }
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
    return fetch(this._baseUrl + href, { headers: headers }).then(
      this._checkRes
    );
  }
  //метод записывает данные на сервер
  setData(href, method, headers, bodyObject) {
    return fetch(this._baseUrl + href, {
      method: method,
      headers: headers,
      body: bodyObject ? JSON.stringify(bodyObject) : "",
    }).then(this._checkRes);
  }
}
export { Api };

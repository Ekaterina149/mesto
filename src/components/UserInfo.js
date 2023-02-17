class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
 this._userName = document.querySelector(nameSelector);
 this._userJob = document.querySelector(jobSelector);
 this._avatar = document.querySelector(avatarSelector);

  }
  //метод возвращает объект с текстовым содержимым элеметов страницы
  //селекторы которых передаются в конструктор класса UserInfo
  getUserInfo = () => {

    return {
      nameInput: this._userName.textContent,
      jobInput: this._userJob.textContent
    }
  }
  //метод заполняет текстовый контент элементов страницы
  //селекторы которых передаются в конструктор класса UserInfo данными
  //полученными из метода getInputValues() класса PopupWithForm
  setUserInfo = ({nameInput, jobInput, avatarLink}) => {

this._userName.textContent = nameInput;
this._userJob.textContent = jobInput;
this._avatar.src = avatarLink;

  }
}
export {UserInfo};

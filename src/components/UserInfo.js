class UserInfo {
  constructor({nameSelector, jobSelector}) {
 this._userName = document.querySelector(nameSelector);
 this._userJob = document.querySelector(jobSelector);

  }
  //метод возвращает объект с текстовым содержимым элеметов страницы
  //селекторы которых передаются в конструктор класса UserInfo
  getUserInfo = () => {

    return {
      NameInput: this._userName.textContent,
      JobInput: this._userJob.textContent
    }
  }
  //метод заполняет текстовый контент элементов страницы
  //селекторы которых передаются в конструктор класса UserInfo данными
  //полученными из метода getInputValues() класса PopupWithForm
  SetUserInfo = ({NameInput, JobInput}) => {

this._userName.textContent = NameInput;
this._userJob.textContent = JobInput;

  }
}
export {UserInfo};

class UserInfo {
  constructor({nameSelector, jobSelector}) {
 this._userName = document.querySelector(nameSelector);
 this._userJob = document.querySelector(jobSelector);

  }
  getUserInfo = () => {

    return {
      NameInput: this._userName.textContent,
      JobInput: this._userJob.textContent
    }
  }
  SetUserInfo = ({NameInput, JobInput}) => {

this._userName = NameInput;
this._userJob = JobInput;

  }
}
export {UserInfo};

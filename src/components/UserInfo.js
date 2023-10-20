export class UserInfo {
  constructor({ usernameSelector, userjobSelector, userAvatarSelector }) {
    this._username = document.querySelector(usernameSelector)
    this._userjob = document.querySelector(userjobSelector)
    this._avatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._username.textContent,
      job: this._userjob.textContent
    };
  }

  setUserInfo({ name, about, avatar }) {
    this._username.textContent = name
    this._userjob.textContent = about
    this._avatar.style.background = `url(${avatar})`;

  }

}
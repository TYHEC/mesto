export class UserInfo {
    constructor({ usernameSelector, userjobSelector }) {
        this._username = document.querySelector(usernameSelector)
        this._userjob = document.querySelector(userjobSelector)
    }

    getUserInfo() {
        return {
          name: this._username.textContent,
          job: this._userjob.textContent
        };
      }

    setUserInfo({name, job}) {
        this._username.textContent = name
        this._userjob.textContent = job
    }
}
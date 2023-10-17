export class UserInfo {
  constructor(userSelectors) {
      this._profileName = document.querySelector(userSelectors.name)
      this._profileJob = document.querySelector(userSelectors.job)
  }

  getUserInfo() {
      this._userData = {
          name: this._profileName.textContent,
          job: this._profileJob.textContent
      }

      return this._userData
  }

  setUserInfo(name, job) {
      this._profileName.textContent = name.value
      this._profileJob.textContent = job.value
  }
}
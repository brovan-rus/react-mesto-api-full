import { handleResponse } from "./utils";

class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
  }
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(handleResponse);
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(handleResponse);
  }

  setCurrentUser(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.userName,
        about: userData.userDescription,
      }),
    }).then(handleResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(handleResponse);
  }

  changeLikeCardStatus(cardID, isLikedByMe) {
    if (!isLikedByMe) return this.setCardLike(cardID);
    else return this.removeCardLike(cardID);
  }

  setCardLike(cardID) {
    return fetch(
      `${this._url}/cards/likes/${cardID}`,
      {
        method: "PUT",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    ).then(handleResponse);
  }

  removeCardLike(cardID) {
    return fetch(
      `${this._url}/likes/${cardID}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
      }
    ).then(handleResponse);
  }

  removeCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(handleResponse);
  }

  avatarChange(link) {
    return fetch(`${this._url}/users/me/avatar/`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(handleResponse);
  }
}

// Создаём экземляр класса для работы с API
export default Api;

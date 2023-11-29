class Api {
  #baseUrl
  #headers
  constructor(options) {
    this.#baseUrl = options.baseUrl;
    this.#headers = options.headers;
  }

  #onResponce(res) {
    return res.ok ? res.json() : res.json().then((errData) => Promise.reject(errData));
  }

  getUserInfo() {
    return fetch(`${this.#baseUrl}/users/me`, {
      headers: this.#headers
    })
      .then(this.#onResponce)
  }

  getInitialCards() {
    return fetch(`${this.#baseUrl}/cards`, {
      headers: this.#headers
    })
      .then(this.#onResponce)
  }

  editProfile(name, about) {
    return fetch(`${this.#baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this.#onResponce)
  }

  addCard(name, link) {
    return fetch(`${this.#baseUrl}/cards`, {
      method: 'POST',
      headers: this.#headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this.#onResponce)
  }

  deleteCard(cardId) {
    return fetch(`${this.#baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.#headers
    })
      .then(this.#onResponce)
  }

  changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this.#baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? 'PUT' : 'DELETE',
        headers: this.#headers
      })
        .then(this.#onResponce)
  }

  updateAvatar(avatar) {
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.#headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this.#onResponce)
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '77f03978-6dde-466c-bc25-400409d54388',
    'Content-Type': 'application/json'
  }
});

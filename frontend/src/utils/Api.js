class Api {
  #baseUrl
  constructor(options) {
    this.#baseUrl = options.baseUrl;
  }

  #onResponce(res) {
    return res.ok ? res.json() : res.json().then((errData) => Promise.reject(errData));
  }

  getUserInfo() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this.#onResponce)
  }

  getInitialCards() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this.#onResponce)
  }

  editProfile(name, about) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this.#onResponce)
  }

  addCard(name, link) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this.#onResponce)
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this.#onResponce)
  }

  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    })
      .then(this.#onResponce)
  }

  updateAvatar(avatar) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.#baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(this.#onResponce)
  }
}

export const api = new Api({
  baseUrl: 'https://api.mestobydi.nomoredomainsmonster.ru',
});

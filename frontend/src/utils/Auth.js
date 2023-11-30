class Auth {
  #baseUrl
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  #onResponce(res) {
    return res.ok ? res.json() : res.json().then((errData) => Promise.reject(errData));
  }

  //регистрация, вернёт объект с id и email
  singUp(email, password) {
    return fetch((`${this.#baseUrl}/signup`), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then(this.#onResponce)
  }

  //авторизация, вернёт токен
  singIn(email, password) {
    return fetch((`${this.#baseUrl}/signin`), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
      .then(this.#onResponce)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
  }

  //проверка токена, вернёт объект с id и email
  checkToken(JWT) {
    return fetch((`${this.#baseUrl}/users/me`), {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      }
    })
      .then(this.#onResponce)
  }
}

export const auth = new Auth('https://api.mestobydi.nomoredomainsmonster.ru');

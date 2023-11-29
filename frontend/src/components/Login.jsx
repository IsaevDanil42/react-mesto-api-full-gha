import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/Auth';

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return
    }
    auth.singIn(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin(email);
          setEmail('');
          setPassword('');
          navigate('/', { replace: true });
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="page">
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title">Вход</h2>
          <input className="form__input" id="email" name="input-email" value={email ?? ''} onChange={handleChangeEmail} placeholder="Email" type="email" minLength="2" maxLength="40" required />
          <input className="form__input" id="password" name="input-password" value={password ?? ''} onChange={handleChangePassword} placeholder="Пароль" type="password" minLength="2" maxLength="200" required />
          <button className="form__submit-btn" type="submit">Войти</button>
        </form>
      </div>
    </div>
  )
}

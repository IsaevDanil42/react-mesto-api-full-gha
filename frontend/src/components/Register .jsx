import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../utils/Auth';

export default function Register({ openInfoTooltip }) {
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
    auth.singUp(email, password)
      .then((data) => {
        if (data) {
          openInfoTooltip(true);
          setEmail('');
          setPassword('');
          navigate('/sign-in', { replace: true });
        } else {
          openInfoTooltip(false);
        }
      })
      .catch(err => {
        console.log(err)
        openInfoTooltip(false)
      })
  }

  return (
    <div className="page">
      <div className="content">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title">Регистрация</h2>
          <input className="form__input" id="email" name="input-email" value={email ?? ''} onChange={handleChangeEmail} placeholder="Email" type="email" minLength="2" maxLength="40" required />
          <input className="form__input" id="password" name="input-password" value={password ?? ''} onChange={handleChangePassword} placeholder="Пароль" type="password" minLength="2" maxLength="200" required />
          <button className="form__submit-btn" type="submit">Зарегистрироваться</button>
          <h3 className="form__subtitle">Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></h3>
        </form>
      </div>
    </div>
  )
}

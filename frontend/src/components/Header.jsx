import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/header-logo.svg';
import { useState } from 'react';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логототип проекта" />
      <Routes>
        <Route exact path="/" element={
          <>
            <div className="header__info-container">
              <p className="header__email">{email}</p>
              <Link to="/sign-in" className="header__link header__link_main-page" onClick={onSignOut}>Выйти</Link>
            </div>
            {/* <button className={!buttonActive ? "header__menu-button" : "header__menu-button header__menu-button_active"}></button> */}
          </>
        } />
        <Route path="/sign-up" element={
          <Link to="/sign-in" className="header__link">Войти</Link>
        } />
        <Route path="/sign-in" element={
          <Link to="/sign-up" className="header__link">Регистрация</Link>}
        />
      </Routes>
    </header>
  )
}

export default Header;

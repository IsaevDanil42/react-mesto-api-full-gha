import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import { auth } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup ';
import Login from './Login';
import Register from './Register ';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => console.log(err))

      api.getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn])

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((data) => {
          setLoggedIn(true);
          setEmail(data.email);
          navigate('/', { replace: true });
        })
        .catch(err => console.log(err))
    }
  }, [])

  const handleCardLike = function (card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err))
  }

  const handleCardDelete = function (card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateUser = function (name, about) {
    api.editProfile(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateAvatar = function (url) {
    api.updateAvatar(url)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleAddPlaceSubmit = function (name, link) {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const handleEditAvatarClick = function () {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = function () {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = function () {
    setAddPlacePopupOpen(true);
  }

  const openInfoTooltip = function (status) {
    setInfoTooltipPopupOpen(true);
    setInfoTooltipStatus(status);
  }

  const handleCardClick = function (card) {
    setSelectedCard(card);
  }

  const closeAllPopups = function () {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelectedCard({});
  }

  const handleLogin = function (email) {
    setEmail(email);
    setLoggedIn(true);
  }

  const onSignOut = function () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={onSignOut} />
        <Routes>
          <Route path='*' element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          } />
          <Route path='/sign-up' element={<Register openInfoTooltip={openInfoTooltip} />} />
          <Route path='/sign-in' element={<Login handleLogin={handleLogin} setEmail={setEmail}/>} />
        </Routes>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        {isAddPlacePopupOpen && <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />}
        <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
        {isEditAvatarPopupOpen && <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />}
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} infoTooltipStatus={infoTooltipStatus} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}



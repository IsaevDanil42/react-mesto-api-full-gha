import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `elements__like ${isLiked && 'elements__like_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="elements__card">
      <div className="elements__photo" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}/>
      <h2 className="elements__title">{card.name}</h2>
      <div className="elements__like-container">
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <p className="elements__like-counter">{card.likes.length}</p>
      </div>
      {isOwn && <button className="elements__delete-btn" type="button" onClick={handleDeleteClick}></button>}
    </div>
  )
}

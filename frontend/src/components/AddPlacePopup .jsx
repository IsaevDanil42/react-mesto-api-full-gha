import React, { useState } from "react"
import PopupWithForm from "./PopupWithForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [place, setPlace] = useState('');
  const [link, setLink] = useState('');

  React.useEffect(() => {
    return function cleanup() {
      setPlace('');
      setLink('');
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(place, link);
  }

  function handlePlaceChange(e) {
    setPlace(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm name="add" title="Новое место" buttonText="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input" id="place-name" name="input-title" placeholder="Название" type="text" minLength="2" maxLength="30" required value={place} onChange={handlePlaceChange} />
      <span className="popup__error popup__place-name"></span>
      <input className="popup__input" id="link" name="input-link" placeholder="Ссылка на картинку" type="url" required value={link} onChange={handleLinkChange} />
      <span className="popup__error popup__link"></span>
    </PopupWithForm>
  )
}

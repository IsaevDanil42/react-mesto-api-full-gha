import React, { useState } from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescripton] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescripton(currentUser.about);
  }, [currentUser, isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(name, description);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescripton(e.target.value);
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input" id="name" name="input-name" value={name ?? ''} onChange={handleChangeName} placeholder="Имя" type="text" minLength="2" maxLength="40" required />
      <span className="popup__error popup__name"></span>
      <input className="popup__input" id="profession" name="input-profession" value={description  ?? ''} onChange={handleChangeDescription} placeholder="О себе" type="text" minLength="2" maxLength="200" required />
      <span className="popup__error popup__profession"></span>
    </PopupWithForm>
  )
}

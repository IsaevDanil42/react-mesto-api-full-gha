import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {
  const [url, setUrl] = useState('');
  const urlRef = React.useRef();

  React.useEffect(() => {
    return function cleanup() {
      setUrl('');
    }
  }, [])

  function handleChange(e) {
    setUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(urlRef.current.value);
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input" id="avatar-link" name="avatar-input-link" placeholder="Ссылка на аватар" type="url" required value={url} onChange={handleChange} ref={urlRef}/>
      <span className="popup__error popup__avatar-link"></span>
    </PopupWithForm>
  )
}

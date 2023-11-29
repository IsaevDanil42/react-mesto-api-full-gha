export default function ImagePopup({ card, onClose}) {
  return (
    <div className={card.link ? "popup popup_photo  popup_opened" : "popup popup_photo"} id="image">
      <div className="popup__image-container">
        <img className="popup__image" alt={card.name} src={card.link}/>
        <p className="popup__subtitle">{card.name}</p>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}

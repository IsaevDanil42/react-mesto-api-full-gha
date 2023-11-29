export default function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit}) {
  return (
    <div className={(isOpen ? "popup popup_opened" : "popup")}  id={`${name}`}>
      <div className="popup__container">
        <form className="popup__form" id={`${name}-form`} name={`popup-${name}`} method="post" noValidate onSubmit={onSubmit}>
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__submit-btn" type="submit">{buttonText}</button>
        </form>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}



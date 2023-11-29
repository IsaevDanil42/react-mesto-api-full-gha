import success from '../images/success.svg';
import fail from '../images/fail.svg'

export default function InfoTooltip({ isOpen, onClose, infoTooltipStatus }) {
  return (
    <div className={(isOpen ? "popup popup_opened" : "popup")}>
      <div className="popup__container">
        <img className="popup__tooltip-image" src={infoTooltipStatus ? success : fail} />
        <p className="popup__tooltip-text">{infoTooltipStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        <button className="popup__close-btn" type="button" onClick={onClose}></button>
      </div>
    </div>
  )
}

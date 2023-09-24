import React from "react"
import "./Popup.css"

function InfoTooltip({ onClose, isOpen, isSuccess }) {
    return (
        <div className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button
                    className="popup__close"
                    type="button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <div className="tooltip">

                    <p className="tooltip__text">
                        {isSuccess
                            ? "Номер успешно забронирован!"
                            : "Что-то пошло не так!"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip
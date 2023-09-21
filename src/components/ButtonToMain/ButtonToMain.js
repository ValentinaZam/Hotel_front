import React from 'react';
import { Link } from 'react-router-dom';
import "./ButtonToMain.css"

function ButtonToMain() {
    const handleGoToMain = () => {
        window.location.href = "/";
    }
    return (<div className="form__container_logo">
        <Link to="/" className="form__logo_button">
        </Link>
        <button className="button__logo_text" onClick={handleGoToMain}>На главную</button>
    </div>)
}

export default ButtonToMain;
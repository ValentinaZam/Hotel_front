import React from "react"
import { Link } from "react-router-dom"
import "./Form.css"

function Form({
  linkText,
  link,
  children,
  title,
  buttonText,
  question,
  onSubmit,
  resetErrorGlobal
}) {
  const handleGoToMain = () => {
    window.location.href = "/";
  }

  function handleLoginClick() {
    resetErrorGlobal();
  }
  return (
    <div className="form">
      <div className="form__container_logo">
        <Link to="/" className="form__logo">
        </Link>
        <button className="form__logo_title" onClick={handleGoToMain}>На главную</button>
      </div>
      <h1 className="form__title">{title}</h1>
      <form className="form__container" noValidate onSubmit={onSubmit}>
        <div>{children}</div>
        <button
          type="submit"
          className="form__button-save"
        >
          {buttonText}
        </button>
      </form>
      <p className="form__text">
        {question}
        <Link to={link} className="form__link" onClick={handleLoginClick}>
          {linkText}
        </Link>
      </p>
    </div>
  )
}

export default Form

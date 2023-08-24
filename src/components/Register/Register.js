import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"

function Register() {
  return (
    <main>
      <section>
        <Form
          title="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          question="Уже зарегистрированы?"
          linkText=" Войти"
          link="/signin"
        >
          <label className="form__label">
            Имя
            <input
              name="name"
              className="form__input"
              id="name-input"
              type="text"
              minLength="2"
              maxLength="40"
              required
              placeholder="Имя"
            />
          </label>
          <label className="form__label">
            E-mail
            <input
              name="email"
              className="form__input"
              id="email-input"
              type="email"
              required
              placeholder="Почта"
              minLength="4"
              maxLength="40"
            />
          </label>
          <label className="form__label">
            Пароль
            <input
              name="password"
              className="form__input"
              style={{ color: '#EE3465' }}
              id="password-input"
              type="password"
              required
              placeholder="Пароль"
              minLength="6"
              maxLength="20"
            />
            <span className="form__input-error">Что-то пошло не так...</span>
          </label>
          <span className="form__input-error form__input-error_general">При регистрации пользователя произошла ошибка.</span>
        </Form>
      </section>
    </main>
  )
}

export default Register

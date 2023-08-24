import React from "react"
import "../Form/Form.css"
import Form from "../Form/Form"

function Login() {
  return (
    <main>
      <section>
        <Form
          title="Рады видеть!"
          buttonText="Войти"
          question="Еще не зарегистрированы?"
          linkText=" Регистрация"
          link="/signup"
        >
          <label className="form__label">
            E-mail
            <input
              name="email"
              className="form__input"
              type="email"
              required
              placeholder="Почта"
              minLength="4"
              maxLength="40"
            />
            {/* <span className="form__input-error">Адрес электронной почты введён не верно.</span> */}
          </label>
          <label className="form__label">
            Пароль
            <input
              name="password"
              className="form__input"
              type="password"
              required
              placeholder="Пароль"
              minLength="6"
              maxLength="20"
            />
            {/* <span className="form__input-error">Введите пароль</span> */}
          </label>
        </Form>
      </section>
    </main>
  )
}

export default Login

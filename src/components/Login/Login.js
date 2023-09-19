import React, { useEffect, useState } from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import { validator } from "../Validator/validator"

function Login({ onSubmit, errorGlobal, resetErrorGlobal }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({});
  const isValidate = Object.keys(errors).length === 0;

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоять минимум из 6 символов",
        value: 6
      }
    }
  };

  const validate = () => {
    const errors = validator(formValue, validatorConfig)
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [formValue, errorGlobal]);

  const handleChangeLogged = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate();
    if (!isValid) return;
    onSubmit(formValue)
    resetErrorGlobal()
  }

  return (
    <main>
      <section>
        <Form
          title="Рады видеть!"
          buttonText="Войти"
          question="Еще не зарегистрированы?"
          linkText=" Регистрация"
          link="/signup"
          onSubmit={handleSubmit}
          isValid={isValidate}
          resetErrorGlobal={resetErrorGlobal}
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
              onChange={handleChangeLogged}
            />
            <span className="form__input-error">{errors.email}</span>
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
              onChange={handleChangeLogged}
            />
            <span className="form__input-error">{errors.password}</span>
            <span className="form__input-error form__input-error_general">
              {errorGlobal}</span>
          </label>
        </Form>
      </section>
    </main>
  )
}

export default Login

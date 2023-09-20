import React, { useEffect, useState } from "react"
import "../Form/Form.css"
import Form from "../Form/Form"
import { validator } from "../Validator/validator"

function Register({ onSubmit, errorGlobal, resetErrorGlobal }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    name: ""
  })

  const [errors, setErrors] = useState({});
  const isValidate = Object.keys(errors).length === 0;

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      isName: {
        message: "Допустимы: латиница, кириллица, пробел, дефис"
      },
      min: {
        message: "Имя должно содержать минимум 2 символа",
        value: 2
      }
    },
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

  const handleChangeLogged = (e) => {
    const { name, value } = e.target
    setFormValue({
      ...formValue,
      [name]: value
    })
  }
  const validate = () => {
    const errors = validator(formValue, validatorConfig)
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate();
    if (!isValid) return;
    onSubmit(formValue)
    errorGlobal = "";
  }

  useEffect(() => {
    validate();
  }, [formValue]);

  return (
    <main>
      <section>
        <Form
          title="Добро пожаловать!"
          buttonText="Зарегистрироваться"
          question="Уже зарегистрированы?"
          linkText=" Войти"
          link="/signin"
          resetErrorGlobal={resetErrorGlobal}
          isValid={isValidate}
          onSubmit={handleSubmit}
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
              onChange={handleChangeLogged}
            />
            <span className="form__input-error">{errors.name}</span>
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
              onChange={handleChangeLogged}
            />
            <span className="form__input-error">{errors.email}</span>
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
              onChange={handleChangeLogged}
            />
            <span className="form__input-error">{errors.password}</span>
          </label>
          <span className="form__input-error form__input-error_general">{errorGlobal}</span>
        </Form>
      </section>
    </main>
  )
}

export default Register

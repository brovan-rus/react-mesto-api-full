import { Link } from "react-router-dom";
import React from "react";
import UserForm from "./UserForm";

function Register({ title, buttonText, onRegister }) {
  const handleRegister = (email, password) => {
    onRegister(email, password);
  };
  return (
    <UserForm
      place="register"
      title={title}
      buttonText={buttonText}
      onSubmit={handleRegister}
    >
      <div className="user-form__ending-container">
        <span className="user-form__ending">Уже зарегистрированы?</span>
        <Link className="user-form__link" to="/sing-in">
          Войти
        </Link>
      </div>
    </UserForm>
  );
}

export default Register;

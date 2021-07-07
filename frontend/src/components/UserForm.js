import React from "react";

function UserForm({ place, title, buttonText, onSubmit, children }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };
  return (
    <form
      className={place ? `user-form user-form_place_${place}` : "user-form"}
      onSubmit={handleSubmit}
    >
      <h1 className="user-form__title">{title}</h1>
      <input
        className="user-form__input"
        placeholder="Email"
        type="email"
        required
        minLength="2"
        maxLength="40"
        name="email"
        value={email}
        onChange={handleSetEmail}
        autoComplete="off"
      />
      <input
        className="user-form__input"
        placeholder="Пароль"
        type="password"
        required
        minLength="2"
        maxLength="40"
        name="password"
        value={password}
        onChange={handleSetPassword}
      />
      <button className="user-form__button" type="submit">
        {buttonText}
      </button>
      {children}
    </form>
  );
}

export default UserForm;

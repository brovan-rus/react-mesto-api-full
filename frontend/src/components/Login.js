import React from "react";
import UserForm from "./UserForm";

function Login({ title, buttonText, onLogin }) {
  const handleLogin = (email, password) => {
    onLogin(email, password);
  };
  return (
    <UserForm title={title} buttonText={buttonText} onSubmit={handleLogin} />
  );
}

export default Login;

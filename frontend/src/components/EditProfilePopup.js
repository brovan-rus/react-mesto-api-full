import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSetName = (e) => {
    setName(e.target.value);
  };
  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(name, description);
  };

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userDescription);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      submitButtonText="Сохранить"
      content="profile-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_info_name"
        autoComplete="off"
        id="profile-name-input"
        required
        minLength="2"
        maxLength="40"
        type="text"
        name="userName"
        placeholder="Имя"
        value={name}
        onChange={handleSetName}
      />
      <span className="form__input-error profile-name-input-error"></span>
      <input
        className="form__input form__input_info_value"
        autoComplete="off"
        id="profile-job-input"
        required
        minLength="2"
        maxLength="200"
        type="text"
        name="userJob"
        placeholder="О себе"
        value={description}
        onChange={handleSetDescription}
      />
      <span className="form__input-error profile-job-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

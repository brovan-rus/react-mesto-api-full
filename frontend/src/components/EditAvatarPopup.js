import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatarRef);
  };

  return (
    <PopupWithForm
      title="Обновить аватар"
      submitButtonText="Сохранить"
      content="delete-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_info_value"
        autoComplete="off"
        required
        id="avatar-link-input"
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
        ref={avatarRef}
      />
      <span className="form__input-error form__input-error_content_avatar-renew avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

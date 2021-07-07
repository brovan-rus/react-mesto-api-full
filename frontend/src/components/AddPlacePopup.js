import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onCardAdd }) {
  const [url, setUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const handleSetUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardAdd(title, url);
  };

  React.useEffect(() => {
    setUrl("");
    setTitle("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      submitButtonText="Создать"
      content="card-add"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input form__input_info_name"
        id="card-title-input"
        required
        autoComplete="off"
        minLength="2"
        maxLength="30"
        type="text"
        name="name"
        placeholder="Название"
        value={title}
        onChange={handleSetTitle}
      />
      <span className="form__input-error card-title-input-error"></span>
      <input
        className="form__input form__input_info_value"
        autoComplete="off"
        required
        id="card-link-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={url}
        onChange={handleSetUrl}
      />
      <span className="form__input-error card-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

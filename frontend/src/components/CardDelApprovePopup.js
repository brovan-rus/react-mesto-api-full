import React from "react";
import PopupWithForm from "./PopupWithForm";

function CardDelApprovePopup({ isOpen, onClose, onCardDel, card }) {
  const submitCardDel = (e) => {
    e.preventDefault();
    onCardDel(card);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      submitButtonText="Да"
      content="delete-card"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={submitCardDel}
    />
  );
}

export default CardDelApprovePopup;

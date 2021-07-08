import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser.userId;
  const isLikedByMe = card.likes.some(
    (like) => like === currentUser.userId
  );

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li>
      <div className="card">
        <button
          type="button"
          className={
            isOwn ? "card__trash-button" : "card__trash-button_inactive"
          }
          onClick={handleCardDelete}
        />
        <img
          className="card__image"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        <div className="card__description">
          <h2 className="card__title">{card.name}</h2>
          <div className="card__like-container">
            <button
              type="button"
              className={
                isLikedByMe
                  ? "card__like-button card__like-button_active"
                  : "card__like-button"
              }
              onClick={handleLikeClick}
            />
            <span className="card__like-counter">{card.likes.length}</span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;

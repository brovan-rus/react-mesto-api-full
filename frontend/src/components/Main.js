import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  handleEditAvatarClick,
  handleProfileEditClick,
  handleAddPlaceClick,
  handleCardClick,
  onCardDelete,
  onCardLike,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content page__content">
      <section className="profile content__profile">
        <div
          className="profile__photo"
          style={{ backgroundImage: `url(${currentUser.userAvatar})` }}
          onClick={handleEditAvatarClick}
        />
        <div className="profile__container">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.userName}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={handleProfileEditClick}
            />
          </div>
          <p className="profile__job">{currentUser.userDescription}</p>
        </div>
        <button
          type="button"
          className="profile__plus-button"
          onClick={handleAddPlaceClick}
        />
      </section>
      <section className="cards content__cards">
        <ul className="cards__list">
          {cards && cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import ImagePopup from "./ImagePopup";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CardDelApprovePopup from "./CardDelApprovePopup";
import {Route, Switch, Link, useHistory} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import {signIn, signUp, checkAuth} from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import {apiUrl} from "../utils/constants";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isCardDelApprovePopupOpen, setIsCardDelApprovePopup] = React.useState(
    false
  );
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(
    false
  );
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState({isOpened: false});
  const [currentUser, setCurrentUser] = React.useState({
    userName: "Загрузка...",
    userDescription: "Загрузка...",
    userAvatar: "../images/loading.jpg",
    userId: "",
  });
  const [deletingCard, setDeletingCard] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("email");
  const [cards, setCards] = React.useState([]);
  const history = useHistory();

  const handleCardLike = (card) => {
    const isLikedByMe = card.likes.some(
      (like) => like === currentUser.userId
    );
    api
      .changeLikeCardStatus(card._id, isLikedByMe)
      .then((res) => {
          const newCard = res.data;
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c))
          )
        }
      )
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then((answer) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setDeletingCard({});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelApprove = (card) => {
    setIsCardDelApprovePopup(true);
    setDeletingCard(card);
  };

  const api = new Api(apiUrl, `Bearer ${localStorage.getItem("jwt")}`);

  React.useEffect(() => {
    api
      .getCurrentUser()
      .then((res) => {
        const {name, about, avatar, _id} = res.data;
        setCurrentUser({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
          userId: _id,
        });
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((answer) => {
        setCards(answer.data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      checkAuth(localStorage.getItem("jwt"))
        .then((res) => {
          setUserEmail(res.data.email);
          setIsLoggedIn(true);
          history.push("/");
        })
        .catch((e) => console.log(e));
    }
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleProfileEditClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardDelApprovePopup(false);
    setSelectedCard({isOpened: false});
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard({...card, isOpened: true});
  }

  function handleUpdateUser(name, description) {
    api
      .setCurrentUser({userName: name, userDescription: description})
      .then((res) => {
        const {name, about} = res.data;
        setCurrentUser({
          ...currentUser,
          userName: name,
          userDescription: about,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarRef) {
    api
      .avatarChange(avatarRef.current.value)
      .then((res) => {
        const avatar = res.data;
        setCurrentUser({... currentUser,
          userAvatar: avatar,
        });
        avatarRef.current.value = "";
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardAdd(name, link) {
    api
      .addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const handleRegister = (email, password) => {
    signUp(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setIsInfoTooltipPopupOpen(true);
        setIsRegistrationSuccess(true);
        setUserEmail(email);
        handleLogin(email, password);
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
        setIsInfoTooltipPopupOpen(true);
        setIsRegistrationSuccess(false);
      });
  };

  const handleLogin = (email, password) => {
    signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setUserEmail(email);
          history.push("/");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page page_position_center">
        <Switch>
          <ProtectedRoute path="/" loggedIn={isLoggedIn} exact>
            <Header
              linkText="Выйти"
              email={userEmail}
              place="main"
              onLogout={handleLogout}
            />
            <Main
              handleAddPlaceClick={handleAddPlaceClick}
              handleEditAvatarClick={handleEditAvatarClick}
              handleProfileEditClick={handleProfileEditClick}
              handleCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelApprove}
            />
            <Footer/>
          </ProtectedRoute>
          <Route loggedIn={isLoggedIn} path="/sign-up">
            <Header linkText="Войти" link="/sign-in"/>
            <Register
              title="Регистрация"
              buttonText="Зарегистрироваться"
              onRegister={handleRegister}
            />
          </Route>
          <Route path="/sign-in">
            <Header linkText="Регистрация" link="/sign-up"/>
            <Login title="Вход" buttonText="Войти" onLogin={handleLogin}/>
          </Route>
          <ProtectedRoute path="*" loggedIn={isLoggedIn}>
            <h1>Ошибка 404</h1>
            <Link to="/">На главную</Link>
          </ProtectedRoute>
        </Switch>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCardAdd={handleCardAdd}
        />
        <CardDelApprovePopup
          isOpen={isCardDelApprovePopupOpen}
          onClose={closeAllPopups}
          card={deletingCard}
          onCardDel={handleCardDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isRegistrationSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

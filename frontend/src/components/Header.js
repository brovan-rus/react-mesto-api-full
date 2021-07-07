import React from "react";
import { Link } from "react-router-dom";

function Header({ linkText, link, email, place, onLogout }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false);
  const handleToggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };
  const handleLogout = () => onLogout();

  return (
    <header className="header page__header">
      <nav
        className={`header__nav ${
          isHamburgerOpen && "header__nav_place_mobile-menu"
        }`}
      >
        <Link className="header__logo" to="/" />
        <div
          className={`header__info ${
            place === "main" && "header__info_place_main"
          }  ${isHamburgerOpen && "header__info_place_mobile-menu"}`}
        >
          {email && <p className="header__email">{email}</p>}
          {place === "main" ? (
            <a
              onClick={handleLogout}
              className="header__link header__link_place_main"
            >
              {linkText}
            </a>
          ) : (
            <Link className="header__link" to={link}>
              {linkText}
            </Link>
          )}
        </div>
        {place === "main" && (
          <div
            className={`hamburger ${isHamburgerOpen && "hamburger_open"}`}
            onClick={handleToggleHamburger}
          >
            <div
              className={`hamburger__line ${
                isHamburgerOpen && "hamburger__line_hidden"
              }`}
            />
            <div
              className={`hamburger__line ${
                isHamburgerOpen && "hamburger__line_hidden"
              }`}
            />
            <div
              className={`hamburger__line ${
                isHamburgerOpen && "hamburger__line_hidden"
              }`}
            />
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;

import "./Header.scss";
import logo from "../../assets/images/InStock-Logo_1x.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to={"/"}>
          <img className="header__logo-image" src={logo} alt="instock Logo" />
        </Link>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink to="/" className="header__nav-link">
              Warehouses
            </NavLink>
          </li>
          <li className="header__nav-item ">
            <NavLink to="/inventory" className="header__nav-link">
              Inventory
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

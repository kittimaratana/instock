import "./Header.scss";
import logo from "../../assets/images/InStock-Logo_1x.png";
import { Link } from "react-router-dom";

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
          <li className="header__nav-item header__nav-item--active">
            <a href="/" className="header__nav-link  ">
              Warehouses
            </a>
          </li>
          <li className="header__nav-item ">
            <a href="/inventory" className="header__nav-link ">
              Inventory
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

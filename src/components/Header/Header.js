import "./Header.scss";
import logo from "../../assets/images/InStock-Logo_1x.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { matchPath } from 'react-router'

function Header() {
  const { pathname } = useLocation();
  let activeClassName = "";
  const warehouseMatch = matchPath({
    path: "/warehouse/:warehouseId",
    exact: true,
    strict: false,
  }, pathname);
  const indexMatch = matchPath( {
    path: "/",
    exact: true,
    strict: false,
  }, pathname);
  if (warehouseMatch || indexMatch) {
    activeClassName = "active";
  }
  return (
    <header className="header">
      <div className="header__center-wrapper">
        <div className="header__logo">
          <Link to={"/"}>
            <img className="header__logo-image" src={logo} alt="instock Logo" />
          </Link>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <NavLink to="/" className={`header__nav-link ${activeClassName}`}>
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
      </div>
    </header>
  );
}

export default Header;

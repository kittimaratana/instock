import arrowBack from "../../assets/images/arrow_back-24px.svg";
import { NavLink } from "react-router-dom";
import "./ArrowBack.scss";

function ArrowBack({ to }) {
  return (
    <NavLink to={to} className="arrow">
      <img className="arrow__img" src={arrowBack} alt="arrow-back" />
    </NavLink>
  );
}

export default ArrowBack;

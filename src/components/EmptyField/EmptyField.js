import ErrorIcon from "../../assets/images/error-24px.svg";
import "./EmptyField.scss";

function EmptyField() {
  return (
    <div className="empty-field">
      <img className="empty-field__icon" src={ErrorIcon} alt="error icon" />
      <span className="empty-field__text">This field is required</span>
    </div>
  );
}

export default EmptyField;

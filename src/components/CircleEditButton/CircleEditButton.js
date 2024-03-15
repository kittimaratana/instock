import circleEdit from "../../assets/images/edit-white-24px.svg";
import "./CircleEditButton.scss";

function CircleEdit() {
  return (
    <div className="circle-edit">
      <img className="circle-edit__icon" src={circleEdit} alt="circle-edit" />
      <span className="circle-edit__text">Edit</span>
    </div>
  );
}

export default CircleEdit;

import "./EditButtonWithIcon.scss";
import circleEdit from "../../assets/images/edit-white-24px.svg"

function EditButtonWithIcon() {
  return (
   <div className="edit-button"><img className="circle-edit" src={circleEdit} alt="circle-edit" />Edit</div> 
  )
}

export default EditButtonWithIcon;
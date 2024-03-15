import "./EditButtonWithIcon.scss";
import circleEdit from "../../assets/images/edit-white-24px.svg"

function EditButtonWithIcon() {
  return (
   <div><img className="circle-edit" src={circleEdit} alt="circle-edit" />EDIT</div> 
  )
}

export default EditButtonWithIcon;
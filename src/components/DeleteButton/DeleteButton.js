import iconDelete from "../../assets/images/delete_outline-24px.svg";

function DeleteButton({ invokeDeleteModal }) {
  return (
    <img src={iconDelete} alt="delete" onClick={invokeDeleteModal} />
  )
}

export default DeleteButton;
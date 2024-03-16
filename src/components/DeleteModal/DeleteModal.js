import "./DeleteModal.scss";
import closeIcon from "../../assets/images/close-24px.svg"

function DeleteModal({ name, clickClose, clickDelete }) {
  return (
    <main className="delete-modal">
      <section className="delete-modal__section">
        <img src={closeIcon} alt="close" onClick={clickClose}/>
        <section className="delete-modal__content">
          <h1 className="delete-modal__header">{`Delete ${name} warehouse?`}</h1>
          <p className="delete-modal__body">{`Please confirm that you’d like to delete the ${name} from the list of warehouses. You won’t be able to undo this action.`}</p>
        </section>
        <div className="delete-modal__buttons">
            <button className="delete-modal__close" onClick={clickClose}>Cancel</button>
            <button className="delete-modal__delete" onClick={clickDelete}>Delete</button>
        </div>
      </section>
    </main>
  );
}

export default DeleteModal;

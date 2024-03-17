import EditInventoryForm from "../../components/EditInventoryForm/EditInventoryForm";
import "./EditInventory.scss"
//calls EditInventoryForm component to edit inventory item
export const EditInventory = () => {
  return (
    <div className="edit-inventory__center-wrap">
      <EditInventoryForm />
    </div>
  );
}

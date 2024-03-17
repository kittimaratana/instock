import AddInventoryForm from "../../components/AddInventoryForm/AddInventoryForm";
import "./AddInventory.scss"
//calls AddInventoryForm component to add new inventory item
export const AddInventory = () => {
  return (
    <div className="add-inventory__center-wrap">
      <AddInventoryForm />
    </div>
  );
}

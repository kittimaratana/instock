import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant-variables";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { SearchAndAddButtonHeader } from "../../components/SearchAndAddButtonHeader/SearchAndAddButtonHeader";

export const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchInventories();
  }, []);
  // Fetching data for inventories
  const fetchInventories = async () => {
    try {
      const getInventoriesResponse = await axios.get(
        `${BASE_URL}/api/inventories`
      );
      setIsLoading(false);
      setInventories([...getInventoriesResponse.data]);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
      console.error(error);
    }
  };
  // Setting required parameters for delete inventory item
  const invokeDeleteModal = (id, name) => {
    setDeleteItem({ id: id, name: name });
  };
  // Deleting selected invenroty item from the inventory list and reload the page
  const deleteSelectedItem = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/inventories/${deleteItem.id}`);
      fetchInventories();
      setDeleteItem(null);
    } catch (error) {
      setHasError(true);
      console.error(error);
    }
  };
  if (hasError) {
    return (
      <p>Unable to access warehouses right now. Please try again later.</p>
    );
  }

  if (isLoading) {
    return <p>Is Loading...</p>;
  }

  return (
    <div className="inventory__center-wrap">
      <SearchAndAddButtonHeader
        className="inventory__header"
        title="Inventory"
        button_text="+ Add New Item"
        link_to="/inventory/add-inventory"
      />

      <hr className="inventory__divider" />
      <InventoriesList
        inventories={inventories}
        withWarehouseName={true}
        invokeDeleteModal={invokeDeleteModal}
      />
      {deleteItem && (
        <DeleteModal
          header={`Delete ${deleteItem.name} inventory item?`}
          body={`Please confirm that you’d like to delete the ${deleteItem.name} from the inventory list. You won’t be able to undo this action.`}
          clickClose={() => setDeleteItem(null)}
          clickDelete={deleteSelectedItem}
        />
      )}
    </div>
  );
};

import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import AddButton from "../../components/AddButton/AddButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import { BASE_URL } from "../../utils/constant-variables";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

export const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchInventories();
  }, []);

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

  const invokeDeleteModal = (id, name) => {
    setDeleteItem({ id: id, name: name });
  };

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
      <section className="inventory__header">
        <h1 className="inventory__header-title">Inventory</h1>
        <div className="inventory__header-actions">
          <SearchInput />
          <AddButton
            className="inventory__header-add-button"
            message="+ Add New Item"
          />
        </div>
      </section>
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

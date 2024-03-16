import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/constant-variables";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";
import { SearchAndAddButtonHeader } from "../../components/SearchAndAddButtonHeader/SearchAndAddButtonHeader";

export const Inventory = () => {
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
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
    fetchInventories();
  }, []);

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

      <InventoriesList inventories={inventories} withWarehouseName={true} />
    </div>
  );
};

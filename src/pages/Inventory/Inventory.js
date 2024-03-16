import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import AddButton from "../../components/AddButton/AddButton";
import SearchInput from "../../components/SearchInput/SearchInput";
import { BASE_URL } from "../../utils/constant-variables";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";

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

      <InventoriesList inventories={inventories} withWarehouseName={true} />
    </div>
  );
};

import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import sort from "../../assets/images/sort-24px.svg";
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
    <div className="warehouse-details__center-wrap">
      <section className="inventory__header">
        <h1 className="inventory__header-name">Inventory</h1>
        <div className="inventory__search-add-container">
          <SearchInput/>
          <AddButton message="+ Add New Item"/>
        </div>
      </section>
      <hr className="inventory__divider1" />
      
      <section className="inventory__label-container">
        <h4 className="inventory__label-item">
          INVENTORY ITEM{" "}
          <img className="inventory__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="inventory__label-category">
          CATEGORY{" "}
          <img className="inventory__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="inventory__label-status">
          STATUS{" "}
          <img className="inventory__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="inventory__label-quantity">
          QUANTITY{" "}
          <img className="inventory__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="inventory__label-action">ACTIONS</h4>
      </section>
      <InventoriesList inventories={inventories} withWarehouseName={true} />
    </div>
  );
};

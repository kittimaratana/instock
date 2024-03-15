import "./Inventory.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import ArrowBack from "../../components/ArrowBack/ArrowBack";
import CircleEdit from "../../components/CircleEditButton/CircleEditButton";
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
     <section className="warehouse-details__header">
        <div iv className="warehouse-details__header-container">
          <ArrowBack to={"/"} />
          <div className="warehouse-details__header-name">
            ''
          </div>
        </div>
        <div className="warehouse-details__header-edit">
          <CircleEdit />
        </div>
        <div className="warehouse-details__header-edit-tablet">
          <CircleEdit />
        </div>
      </section>
      <hr className="warehouse-details__divider1" />
      <InventoriesList inventories={inventories} withWarehouseName={true} />
    </div>
  );
};

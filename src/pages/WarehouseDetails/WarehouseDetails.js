import "./WarehouseDetails.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../../components/ArrowBack/ArrowBack";
import CircleEdit from "../../components/CircleEditButton/CircleEditButton";
import { BASE_URL } from "../../utils/constant-variables";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";
import sort from "../../assets/images/sort-24px.svg";

export const WarehouseDetails = () => {
  const [warehouse, setWarehouse] = useState({});
  const [inventories, setInventories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { warehouseId } = useParams();

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const getWarehouseByIdResponse = await axios.get(
          `${BASE_URL}/api/warehouses/${warehouseId}`
        );
        const getInventoriesResponse = await axios.get(
          `${BASE_URL}/api/warehouses/${warehouseId}/inventories`
        );
        setIsLoading(false);
        setWarehouse({ ...getWarehouseByIdResponse.data });
        setInventories([...getInventoriesResponse.data]);
      } catch (error) {
        setHasError(true);
        setIsLoading(false);
        console.error(error);
      }
    };
    fetchWarehouseData();
  }, [warehouseId]);

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
        <div className="warehouse-details__header-container">
          <ArrowBack to={"/"} />
          <div className="warehouse-details__header-name">
            {warehouse.warehouse_name}
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
      <section className="warehouse-details__container">
        <div className="warehouse-details__sub-item-address">
          <h4 className="warehouse-details__label">WAREHOUSE ADDRESS:</h4>
          <div className="warehouse-details__value">
            {`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
          </div>
        </div>

        <hr className="warehouse-details__section-divider" />

        <div className="warehouse-details__container-row">
          <div className="warehouse-details__sub-item">
            <h4 className="warehouse-details__label">CONTACT NAME:</h4>
            <div className="warehouse-details__value">
              {warehouse.contact_name}
            </div>
            <div className="warehouse-details__value">
              {warehouse.contact_position}
            </div>
          </div>
          <div className="warehouse-details__sub-item">
            <h4 className="warehouse-details__label">CONTACT INFORMATION:</h4>
            <div className="warehouse-details__value">
              {warehouse.contact_phone}
            </div>
            <div className="warehouse-details__value">
              {warehouse.contact_email}
            </div>
          </div>
        </div>
      </section>
      <hr className="warehouse-details__divider2" />

      <section className="warehouse-details__label-container">
        <h4 className="warehouse-details__label-item">
          INVENTORY ITEM <img className="warehouse-details__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse-details__label-category">
          CATEGORY <img className="warehouse-details__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse-details__label-status">
          STATUS <img className="warehouse-details__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse-details__label-quantity">
          QUANTITY{" "}
          <img className="warehouse-details__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse-details__label-action">ACTIONS</h4>
      </section>
   

      <InventoriesList inventories={inventories} withWarehouseName={false} />
    </div>
  );
};

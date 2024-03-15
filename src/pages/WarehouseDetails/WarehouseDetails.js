import "./WarehouseDetails.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../../components/ArrowBack/ArrowBack";
import CircleEdit from "../../components/CircleEditButton/CircleEditButton";

const baseUrl = "http://localhost:5001/api";

export const WarehouseDetails = () => {
  const [warehouse, setWarehouse] = useState({});
  const { warehouseId } = useParams();

  useEffect(() => {
    const fetchWarehouseData = async () => {
      try {
        const getWarehouseByIdResponse = await axios.get(
          `${baseUrl}/warehouses/${warehouseId}`
        );
        setWarehouse({ ...getWarehouseByIdResponse.data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchWarehouseData();
  }, [warehouseId]);

  return (
    <div className="warehouse-details__center-wrap">
      <section className="warehouse-details__header">
        <div className="warehouse-details__header-container">
          <ArrowBack />
          <div className="warehouse-details__header-name">
            {warehouse.warehouse_name}
          </div>
        </div>
        <div className="warehouse-details__header-edit">
          <CircleEdit />
        </div>
      </section>
      <hr className="warehouse-details__divider1" />
      <section className="warehouse-details__container">
        <div className="warehouse-details__sub-item-address">
          <h4 className="warehouse-details__label">WAREHOUSE ADDRESS:</h4>
          <div className="warehouse-details__value">{warehouse.address}</div>
        </div>
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
            <h4 className="warehouse-details__label">CONTACT INFORMATION</h4>
            <div className="warehouse-details__value">
              {warehouse.contact_phone}
            </div>
            <div className="warehouse-details__value">
              {warehouse.contact_email}
            </div>
          </div>
        </div>
      </section>
      <hr className="warehouse-details__divider1" />

      <section className="warehouse-details__container">
        <div className="warehouse-details__container-row">
          <div className="warehouse-details__col">
            <div className="warehouse-details__sub-item">
              <h4 className="warehouse-details__label">INVENTORY ITEM</h4>
              <p>TV</p>
            </div>
            <div className="warehouse-details__sub-item">
              <h4 className="warehouse-details__label">CATEGORY</h4>
              <p>Gear</p>
            </div>
          </div>
          <div className="warehouse-details__col">
            <div className="warehouse-details__sub-item">
              <h4 className="warehouse-details__label">STATUS</h4>
              <p className="instock">IN STOCK</p>
              <p className="outofstock">OUT OF STOCK</p>
            </div>
            <div className="warehouse-details__sub-item">
              <h4 className="warehouse-details__label">QTY</h4>
              <p>0</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

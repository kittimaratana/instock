import "./WarehouseTable.scss";
import WareHouseItem from "../WareHouseItem/WareHouseItem";
import SearchInput from "../SearchInput/SearchInput";
import AddButton from "../AddButton/AddButton";
import sort from "../../assets/images/sort-24px.svg";
import { BASE_URL } from "../../utils/constant-variables";
import { useState, useEffect } from "react";
import axios from "axios";

function WarehouseTable() {
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const responseWarehouses = await axios.get(`${BASE_URL}/api/warehouses`);
        setWarehouses(responseWarehouses.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
      }
    };
    fetchWarehouse();
  }, []);

  if (hasError) {
    return <p>Unable to access warehouses right now. Please try again later.</p>;
  }

  if (isLoading) {
    return <p>Is Loading...</p>;
  }

  if (warehouses.length === 0) {
    return <p>No warehouses available</p>;
  }

  const dividerSkipId = warehouses[warehouses.length-1].id;

  return (
    <section className="warehouse">
      <section className="warehouse__header">
        <h1 className="warehouse__header-name">Warehouses</h1>
        <div className="warehouse__search-add-container">
          <SearchInput/>
          <AddButton message="+ Add New Warehouse"/>
        </div>
      </section>
      <section className="warehouse__label-container">
        <h4 className="warehouse__label-warehouse">WAREHOUSE <img className="warehouse__sort" src={sort} alt="sort" /></h4>
        <h4 className="warehouse__label-address">ADDRESS <img className="warehouse__sort" src={sort} alt="sort" /></h4>
        <h4 className="warehouse__label-name">CONTACT NAME <img className="warehouse__sort" src={sort} alt="sort" /></h4>
        <h4 className="warehouse__label-information">CONTACT INFORMATION{" "}
          <img className="warehouse__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse__label-action">ACTIONS</h4>
      </section>
      <hr className="warehouse__divider1" />
      {warehouses.map((warehouse) => {
        return (
          <>
            <WareHouseItem
              key={warehouse.id}
              warehouseName={warehouse.warehouse_name}
              address={warehouse.address}
              city={warehouse.city}
              country={warehouse.country}
              contactName={warehouse.contact_name}
              contactPhone={warehouse.contact_phone}
              contactEmail={warehouse.contact_email}
              warehouseId={warehouse.id}
            />
            {dividerSkipId === warehouse.id ? null: <hr className="warehouse__divider2" />}
          </>
        )
      })}
    </section>
  );
}

export default WarehouseTable;
import "./WarehouseTable.scss";
import WareHouseItem from "../WareHouseItem/WareHouseItem";
import DeleteModal from "../DeleteModal/DeleteModal";
import sort from "../../assets/images/sort-24px.svg";
import { BASE_URL } from "../../utils/constant-variables";
import { useState, useEffect } from "react";
import axios from "axios";
import { SearchAndAddButtonHeader } from "../../components/SearchAndAddButtonHeader/SearchAndAddButtonHeader";

function WarehouseTable() {
  const [warehouses, setWarehouses] = useState([]);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Fetching warehouses on page load
    fetchWarehouse();
  }, []);

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

  const invokeDeleteModal = (id, name) => {
    setDeleteItem({ id: id, name: name });
  };

  const deleteSelectedItem = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/warehouses/${deleteItem.id}`);
      // Fetching updated warehouses on delete
      fetchWarehouse();
      setDeleteItem(null);
    } catch {
      setHasError(true);
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

  if (warehouses.length === 0) {
    return <p>No warehouses available</p>;
  }

  const dividerSkipId = warehouses[warehouses.length - 1].id;

  return (
    <section className="warehouse">
      <SearchAndAddButtonHeader
        title="Warehouses"
        button_text={"+ Add New Warehouse"}
        link_to="warehouse/add-warehouse"
      />
      <section className="warehouse__label-container">
        <h4 className="warehouse__label-warehouse">
          WAREHOUSE <img className="warehouse__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse__label-address">
          ADDRESS <img className="warehouse__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse__label-name">
          CONTACT NAME <img className="warehouse__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse__label-information">
          CONTACT INFORMATION{" "}
          <img className="warehouse__sort" src={sort} alt="sort" />
        </h4>
        <h4 className="warehouse__label-action">ACTIONS</h4>
      </section>
      <hr className="warehouse__divider1" />
      {warehouses.map((warehouse) => {
        return (
          <section className="warehouse__item" key={warehouse.id}>
            <WareHouseItem
              warehouseName={warehouse.warehouse_name}
              address={warehouse.address}
              city={warehouse.city}
              country={warehouse.country}
              contactName={warehouse.contact_name}
              contactPhone={warehouse.contact_phone}
              contactEmail={warehouse.contact_email}
              warehouseId={warehouse.id}
              invokeDeleteModal={() =>
                invokeDeleteModal(warehouse.id, warehouse.warehouse_name)
              }
            />
            {dividerSkipId === warehouse.id ? null : (
              <hr className="warehouse__divider2" />
            )}
          </section>
        );
      })}
      {deleteItem && (
        <DeleteModal
          name={deleteItem.name}
          clickClose={() => setDeleteItem(null)}
          clickDelete={deleteSelectedItem}
        ></DeleteModal>
      )}
    </section>
  );
}

export default WarehouseTable;

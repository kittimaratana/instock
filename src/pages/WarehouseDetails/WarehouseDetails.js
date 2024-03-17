import "./WarehouseDetails.scss";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../../components/ArrowBack/ArrowBack";
import CircleEdit from "../../components/CircleEditButton/CircleEditButton";
import { BASE_URL } from "../../utils/constant-variables";
import { InventoriesList } from "../../components/InventoriesList/InventoriesList";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

export const WarehouseDetails = () => {
  const [warehouse, setWarehouse] = useState({});
  const [inventories, setInventories] = useState([]);
  const [deleteInventoryItem, setDeleteInventoryItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { warehouseId } = useParams();

  useEffect(() => {
    fetchWarehouseData(warehouseId);
  }, [warehouseId]);
  // Fetching data for warehouse and inventory
  const fetchWarehouseData = async (warehouseId) => {
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
  // Setting required parameters for delete inventory item
  const invokeDeleteModal = (id, name) => {
    setDeleteInventoryItem({ id: id, name: name });
  };
  // Deleting selected invenroty item from the warehouse list and reload the page
  const deleteSelectedInventoryItem = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/inventories/${deleteInventoryItem.id}`);
      fetchWarehouseData(warehouseId);
      setDeleteInventoryItem(null);
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
  // Single Warehouse page
  return (
    <div className="warehouse-details__center-wrap">
      <section className="warehouse-details__header">
        <div className="warehouse-details__header-container">
          <ArrowBack to={"/"} />
          <div className="warehouse-details__header-name">
            {warehouse.warehouse_name}
          </div>
        </div>
        
        <Link to={`/warehouse/${warehouseId}/edit`}  className="warehouse-details__header-edit">
          <CircleEdit />
        </Link>

        <Link to={`/warehouse/${warehouseId}/edit`}  className="warehouse-details__header-edit-tablet">
          <CircleEdit />
        </Link>

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

      <InventoriesList
        inventories={inventories}
        withWarehouseName={false}
        invokeDeleteModal={invokeDeleteModal} />
      {deleteInventoryItem && (
        <DeleteModal
          header={`Delete ${deleteInventoryItem.name} inventory item?`}
          body={`Please confirm that you’d like to delete the ${deleteInventoryItem.name} from the inventory list. You won’t be able to undo this action.`}
          clickClose={() => setDeleteInventoryItem(null)}
          clickDelete={deleteSelectedInventoryItem}
        />
      )}
    </div>
  );
};

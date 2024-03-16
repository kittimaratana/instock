import "./InventoryDetailsTable.scss";
import ArrowBack from "../../components/ArrowBack/ArrowBack";
import CircleEditButton from "../../components/CircleEditButton/CircleEditButton";
import Status from "../../components/Status/Status";
import { NavLink, useParams } from "react-router-dom";

function InventoryDetailsTable({ inventoryInfo }) {
  const { inventoryId } = useParams();
  return (
    <section className="inventoryDetailsTable">
      <div className="inventoryDetailsTable__header">
        <div className="inventoryDetailsTable__header-container">
          <ArrowBack />
          <h1 className="inventoryDetailsTable__header-title">
            {inventoryInfo.item_name}
          </h1>
        </div>
        <div className="inventoryDetailsTable__header-edit">
          <NavLink to={`/inventory/${inventoryId}/edit`}>
            <CircleEditButton />
          </NavLink>
        </div>
      </div>
      <hr className="inventoryDetailsTable__header-divider1" />

      <div className="inventoryDetailsTable__body">
        <div className="inventoryDetailsTable__section">
          <div className="inventoryDetailsTable__item">
            <h4 className="inventoryDetailsTable__label">item description:</h4>
            <p className="inventoryDetailsTable__value">
              {inventoryInfo.description}
            </p>
          </div>

          <div className="inventoryDetailsTable__item">
            <h4 className="inventoryDetailsTable__label">category:</h4>
            <p className="inventoryDetailsTable__value">
              {inventoryInfo.category}
            </p>
          </div>
        </div>

        <hr className="inventoryDetailsTable__section-devider" />

        <div className="inventoryDetailsTable__section">
          <div className="inventoryDetailsTable__section-row">
            <div className="inventoryDetailsTable__item">
              <h4 className="inventoryDetailsTable__label">status:</h4>
              <p className="inventoryDetailsTable__value">
                <Status text={inventoryInfo.status} />
              </p>
            </div>
            <div className="inventoryDetailsTable__item">
              <h4 className="inventoryDetailsTable__label">quantity:</h4>
              <p className="inventoryDetailsTable__value">
                {inventoryInfo.quantity}
              </p>
            </div>
          </div>
          <div className="inventoryDetailsTable__section-row">
            <div className="inventoryDetailsTable__item">
              <h4 className="inventoryDetailsTable__label">warehouse:</h4>
              <p className="inventoryDetailsTable__value">
                {inventoryInfo.warehouse_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryDetailsTable;

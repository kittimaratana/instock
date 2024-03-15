import { Link } from "react-router-dom";
import Status from "../Status/Status";
import "./InventoriesList.scss";
import AttributeLink from "../AttributeLink/AttributeLink";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
export function InventoriesList({ inventories, withWarehouseName }) {
  return (
    <section className="inventories-list__container">
      {inventories.map((inventory) => (
        <InventoriesListItem
          key={inventory.id}
          {...inventory}
          withWarehouseName={withWarehouseName}
        />
      ))}
    </section>
  );
}
export function InventoriesListItem({
  category,
  id,
  item_name,
  quantity,
  status,
  warehouse_name,
  withWarehouseName,
}) {
  return (
    <>
      <div className="inventories-list-item">
        <section className="inventories-list__container-1">
          <div className="inventories-list--mobile">
            <div className="inventories-list__container-row">
              <div className="inventories-list__col">
                <div className="inventories-list__sub-item">
                  <h4 className="inventories-list__label">INVENTORY ITEM</h4>
                  <Link
                    to={`/inventory/${id}`}
                    className="inventories-list__value inventories-list__value--align-text"
                  >
                    <AttributeLink attribute={item_name} device="mobile" />
                  </Link>
                </div>
                <div className="inventories-list__sub-item">
                  <h4 className="inventories-list__label">CATEGORY</h4>
                  <p className="inventories-list__value">{category}</p>
                </div>
              </div>
              <div className="inventories-list__col">
                <div className="inventories-list__sub-item">
                  <h4 className="inventories-list__label">STATUS</h4>
                  <Status text={status} />
                </div>
                <div className="inventories-list__sub-item">
                  <h4 className="inventories-list__label">QTY</h4>
                  <p className="inventories-list__value">{quantity}</p>
                </div>
                {withWarehouseName && (
                  <div className="inventories-list__sub-item">
                    <h4 className="inventories-list__label">WAREHOUSE</h4>
                    <p className="inventories-list__value">{warehouse_name}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="inventories-list__wrap-section3">
              <DeleteButton />
              <EditButton />
            </div>
          </div>
          <div className="inventories-list--tablet">
            <Link
              to={`/inventory/${id}`}
              className="inventories-list__item"
            >
              <AttributeLink attribute={item_name} device="tablet" />
            </Link>
            <p className="inventories-list__category">{category}</p>
            <p className="inventories-list__status"><Status text={status} /></p>
            <p className="inventories-list__quantity">{quantity} </p>
            <div className="inventories-list__action">
              <DeleteButton />
              <EditButton />
            </div>
          </div>
        </section>
        <hr className="inventories-list__divider1" />
      </div>
    </>
  );
}

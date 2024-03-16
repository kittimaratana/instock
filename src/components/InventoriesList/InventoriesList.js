import { Link } from "react-router-dom";
import Status from "../Status/Status";
import "./InventoriesList.scss";
import sort from "../../assets/images/sort-24px.svg";
import AttributeLink from "../AttributeLink/AttributeLink";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
export function InventoriesList({ inventories, withWarehouseName }) {
  return (
    <section className="inventories-list__container">
      <div className="inventories-list__labels">
        <div className="inventories-list__labels-body">
          <div className="inventories-list__labels-section">
            <h4 className="inventories-list__labels-item">
              INVENTORY ITEM
              <img
                className="inventories-list__labels-sort"
                src={sort}
                alt="sort"
              />
            </h4>
            <h4 className="inventories-list__labels-item">
              CATEGORY
              <img
                className="inventories-list__labels-sort"
                src={sort}
                alt="sort"
              />
            </h4>
          </div>
          <div className="inventories-list__labels-section">
            <h4 className="inventories-list__labels-item inventories-list__labels-item-status">
              STATUS
              <img
                className="inventories-list__labels-sort"
                src={sort}
                alt="sort"
              />
            </h4>
            <h4 className="inventories-list__labels-item">
              {withWarehouseName ? "QTY" : "QUANTITY"}
              <img
                className="inventories-list__labels-sort"
                src={sort}
                alt="sort"
              />
            </h4>
            {withWarehouseName && (
              <h4 className="inventories-list__labels-item">
                WAREHOUSE
                <img
                  className="inventories-list__labels-sort"
                  src={sort}
                  alt="sort"
                />
              </h4>
            )}
          </div>
        </div>
        <h4
          className={`inventories-list__labels-item inventories-list__labels-item-actions ${
            withWarehouseName ? "margin-left" : ""
          }`}
        >
          ACTIONS
        </h4>
      </div>
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
      <section className="inventories-list__item">
        <div className="inventories-list__item-body">
          <div className="inventories-list__item-section">
            <div className="inventories-list__sub-item">
              <h4 className="inventories-list__sub-item-label">
                INVENTORY ITEM
              </h4>
              <Link
                to={`/inventory/${id}`}
                className="inventories-list__sub-item-value inventories-list__sub-item-value--align-text"
              >
                <AttributeLink attribute={item_name} device="mobile" />
              </Link>
            </div>
            <div className="inventories-list__sub-item">
              <h4 className="inventories-list__sub-item-label">CATEGORY</h4>
              <p className="inventories-list__sub-item-value">{category}</p>
            </div>
          </div>
          <div className="inventories-list__item-section">
            <div className="inventories-list__sub-item inventories-list__sub-item-status">
              <h4 className="inventories-list__sub-item-label">STATUS</h4>
              <Status text={status} />
            </div>
            <div className="inventories-list__sub-item">
              <h4 className="inventories-list__sub-item-label">QTY</h4>
              <p className="inventories-list__sub-item-value">{quantity}</p>
            </div>
            {withWarehouseName && (
              <div className="inventories-list__sub-item">
                <h4 className="inventories-list__sub-item-label">WAREHOUSE</h4>
                <p className="inventories-list__sub-item-value">
                  {warehouse_name}
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className={`inventories-list__item-buttons ${
            withWarehouseName ? "margin-left" : ""
          }`}
        >
          <DeleteButton />
          <EditButton />
        </div>
      </section>
      <hr className="inventories-list__divider" />
    </>
  );
}

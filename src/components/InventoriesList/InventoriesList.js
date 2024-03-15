import { Link } from "react-router-dom";
import { StatusTag } from "../StatusTag/StatusTag";
import "./InventoriesList.scss";
import AttributeLink from "../AttributeLink/AttributeLink";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";

export function InventoriesList({ inventories }) {
  return (
    <section className="inventories-list__container">
      {inventories.map((inventory) => (
        <InventoriesListItem key={inventory.id} {...inventory} />
      ))}
    </section>
  );
}

export function InventoriesListItem({
  address,
  category,
  city,
  contact_email,
  contact_name,
  contact_phone,
  contact_position,
  country,
  descripyion,
  id,
  item_name,
  quantity,
  status,
  warehouse_id,
  warehouse_name,
}) {
  return (
    <>
      <section className="inventories-list__container-1">
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
              <StatusTag status={status} />
            </div>
            <div className="inventories-list__sub-item">
              <h4 className="inventories-list__label">QTY</h4>
              <p className="inventories-list__value">0</p>
            </div>
          </div>
        </div>
        <div className="inventories-list__wrap-section3">
          <DeleteButton />
          <EditButton />
        </div>
      </section>
      <hr className="inventories-list__divider1" />
    </>
  );
}

import { Link } from "react-router-dom";
import "../WareHouseItem/WareHouseItem.scss";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import AttributeLink from "../AttributeLink/AttributeLink";

function WareHouseItem({
  warehouseId,
  warehouseName,
  address,
  city,
  country,
  contactName,
  contactPhone,
  contactEmail,
  invokeDeleteModal
}) {

  //display warehouse item, includes links and deletion/deits buttons
  return (
    <div className="warehouse-item">
      <div className="warehouse-item--mobile">
        <div className="warehouse-item__wrap-container">
          <div className="warehouse-item__wrap-section1">
            <div className="warehouse-item__sub-item">
              <h4 className="warehouse-item__label">WAREHOUSES</h4>
              <Link to={`/warehouse/${warehouseId}`} className="warehouse-item__value warehouse-item__value--align-text">
                <AttributeLink attribute={warehouseName} device="mobile" />
              </Link>
            </div>
            <div className="warehouse-item__sub-item">
              <h4 className="warehouse-item__label">ADDRESS</h4>
              <p className="warehouse-item__value">{`${address}, ${city}, ${country}`}</p>
            </div>
          </div>
          <div className="warehouse-item__wrap-section2">
            <div className="warehouse-item__sub-item">
              <h4 className="warehouse-item__label">CONTACT NAME</h4>
              <p className="warehouse-item__value">{contactName}</p>
            </div>
            <div className="warehouse-item__sub-item">
              <h4 className="warehouse-item__label">CONTACT INFORMATION</h4>
              <p className="warehouse-item__value">{contactPhone} </p>
              <p className="warehouse-item__value">{contactEmail}</p>
            </div>
          </div>
        </div>
        <div className="warehouse-item__wrap-section3">
          <DeleteButton invokeDeleteModal={invokeDeleteModal} />
          <Link  to={`/warehouse/${warehouseId}/edit`}>
          <EditButton />
          </Link>
        </div>
      </div>
      <div className="warehouse-item--tablet">
        <Link to={`/warehouse/${warehouseId}`} className="warehouse-item__warehouse">
          <AttributeLink attribute={warehouseName} device="tablet" />
        </Link>
        <p className="warehouse-item__address">{`${address}, ${city}, ${country}`}</p>
        <p className="warehouse-item__name">{contactName}</p>
        <p className="warehouse-item__information">
          {contactPhone} <br /> {contactEmail}
        </p>
        <div className="warehouse-item__action">
          <DeleteButton invokeDeleteModal={invokeDeleteModal} />
          <Link  className="warehouse-item__edit-button" to={`/warehouse/${warehouseId}/edit`}>
            <EditButton />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WareHouseItem;

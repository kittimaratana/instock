import { Link } from 'react-router-dom';
import "../WareHouseItem/WareHouseItem.scss";
import iconDelete from "../../assets/images/delete_outline-24px.svg";
import iconEdit from "../../assets/images/edit-24px.svg";
import iconRight from "../../assets/images/chevron_right-24px.svg";

function WareHouseItem({warehouseId, warehouseName, address, city, country, contactName, contactPhone, contactEmail}) {
  //function WareHouseItem(city, address, contactName, contactPhone, contactEmail) {
  return (
    <div className="warehouse-item">
      <div className="warehouse-item--mobile">
        <div className="warehouse-item__wrap-container">
          <div className="warehouse-item__wrap-section1">
            <div className="warehouse-item__sub-item">
              <h4 className="warehouse-item__label">WAREHOUSES</h4>
              <Link to={`/warehouse/${warehouseId}`} className="warehouse-item__value warehouse-item__value--align-text">
                {warehouseName}
                <img
                  className="warehouse-item__iconRight-mobile"
                  src={iconRight}
                  alt="link"
                />
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
              <p className="warehouse-item__value">{contactPhone} </p><br/>
              <p className="warehouse-item__value">{contactEmail}</p>
            </div>
          </div>
        </div>
        <div className="warehouse-item__wrap-section3">
          <img
            className="warehouse-item__icon-delete"
            src={iconDelete}
            alt="delete"
          />
          <img
            className="warehouse-item__icon-edit"
            src={iconEdit}
            alt="edit"
          />
        </div>
      </div>
      <div className="warehouse-item--tablet">
        <Link to={`/warehouse/${warehouseId}`} className="warehouse-item__warehouse">
        {warehouseName}
          <img
            className="warehouse-item__iconRight-tablet"
            src={iconRight}
            alt="search"
          />
        </Link>
        <p className="warehouse-item__address">{`${address}, ${city}, ${country}`}</p>
        <p className="warehouse-item__name">{contactName}</p>
        <p className="warehouse-item__information">{contactPhone} <br/> {contactEmail}</p>
        <div className="warehouse-item__action">
        <img
          className="warehouse-item__icon-delete"
          src={iconDelete}
          alt="delete"
        />
        <img className="warehouse-item__icon-edit" src={iconEdit} alt="edit" />
        </div>
      </div>
    </div>
  );
}

export default WareHouseItem;

import "./AddInventoryForm.scss";
import { BASE_URL } from "../../utils/constant-variables";
import EmptyField from "../EmptyField/EmptyField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../ArrowBack/ArrowBack";

const AddInventoryForm = () => {
  //we need available warehouses for the dropdown menu otherwise it would be thousands of html code because users can create a lot of warehouses
  //for category, it is hardcoded as if the inventory tablet was empty there would be no way to add a new row of data as users will have empty category
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [warehouseIdEmpty, setwarehouseIdEmpty] = useState(false);
  const [itemNameEmpty, setItemNameEmpty] = useState(false);
  const [descriptionEmpty, setDescriptionEmpty] = useState(false);
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const [statusEmpty, setStatusEmpty] = useState(false);
  const [quantityEmpty, setQuantityEmpty] = useState(false);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const responseWarehouses = await axios.get(
          `${BASE_URL}/api/warehouses`
        );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setwarehouseIdEmpty(false);
    setItemNameEmpty(false);
    setDescriptionEmpty(false);
    setCategoryEmpty(false);
    setStatusEmpty(false);
    setQuantityEmpty(false);

    let fieldError = false;
    let quantity = "0";

    if (e.target.warehouseId.value === "") {
      setwarehouseIdEmpty(true);
      fieldError = true;
    }
    //console.log(e.target.warehouseId.value );
    //console.log('hi');

    if (e.target.itemName.value === "") {
      setItemNameEmpty(true);
      fieldError = true;
    }
    //console.log(e.target.itemName.value );
    //console.log('hi');

    if (e.target.description.value === "") {
      setDescriptionEmpty(true);
      fieldError = true;
    }

    //console.log(e.target.description.value );
    //console.log('hi');

    if (e.target.category.value === "") {
      setCategoryEmpty(true);
      fieldError = true;
    }

    //console.log(e.target.category.value );
    //console.log('hi');

    if (e.target.status.value === "") {
      setStatusEmpty(true);
      fieldError = true;
    } else {
      //console.log(e.target.status.value );
      //console.log('hi');
      if (e.target.status.value === "In Stock") {
        if (e.target.quantity.value === "") {
          setQuantityEmpty(true);
          fieldError = true;
        } else {
          quantity = e.target.quantity.value;
          //console.log(e.target.quantity.value );
          //console.log('hi');
        }
      }
    }
    //console.log(e.target.status.value);

    if (fieldError === false) {
      console.log("tester");
      try {
        const response = await axios.post(`${BASE_URL}/api/inventories`, {
          warehouse_id: e.target.warehouseId.value,
          item_name: e.target.itemName.value,
          description: e.target.description.value,
          category: e.target.category.value,
          status: e.target.status.value,
          quantity: quantity,
        });

        e.target.warehouseId.value = "";
        e.target.itemName.value = "";
        e.target.description.value = "";
        e.target.category.value = "";

        if (e.target.status.value === "In Stock") {
          e.target.quantity.value = "";
        }

        e.target.status.value = "";

        setSubmitSuccess(true);
        setTimeout(() => {
          navigate("/inventory");
        }, 3000);
      } catch (error) {
        console.log(error); //modify error message -------------
        setSubmitSuccess(false);
      }
    } else {
      setSubmitSuccess(false);
    }
  };

  return (
    <section className="add-inventory">
      <section className="add-inventory__header">
      <div className="add-inventory__header-container">
      <div className="add-inventory__header-container-arrow"><ArrowBack /></div>
        <h1 className="add-inventory__header-name">Add a New Inventory Item</h1></div>
      </section>

      <hr className="add-inventory__divider" />

      <form onSubmit={handleSubmit}>
        <div className="add-inventory__details-container">
          <div className="add-inventory__details add-inventory__details--tablet">
            <h2 className="add-inventory__details-header-name">Item Details</h2>
            <label htmlFor="item-name" className="add-inventory__form-label">
              Item Name
            </label>
            <input
              className="add-inventory__form-input"
              placeholder="Item Name"
              id="item-name"
              type="text"
              name="itemName"
            />
            {itemNameEmpty && <EmptyField />}

            <label htmlFor="description" className="add-inventory__form-label">
              Description
            </label>
            <input
              className="add-inventory__form-input add-inventory__form-input--description"
              placeholder="Please enter a brief item description..."
              id="description"
              type="text"
              name="description"
            />
            {descriptionEmpty && <EmptyField />}

            <label htmlFor="category" className="add-inventory__form-label">
              Category
            </label>
            <select
              className="add-inventory__form-input add-inventory__form-input--remove-default-dropdown"
              name="category"
              id="category"
            >
              <option value="">Please select</option>
              <option>Health</option>
              <option>Apparel</option>
              <option>Accessories</option>
              <option>Electronics</option>
              <option>Gear</option>
            </select>
            {categoryEmpty && <EmptyField />}
          </div>

          <hr className="add-inventory__divider add-inventory__divider--between-components" />

          <div className="add-inventory__details">
            <h2 className="add-inventory__details-header-name">
              Item Availability
            </h2>
            <label className="add-inventory__form-label">Status</label>
            <div className="add-inventory__form-radio-container">
              <div className="add-inventory__form-radio-item">
                <input
                  className="add-inventory__form-input add-inventory__form-input--status"
                  id="in-stock"
                  type="radio"
                  name="status"
                  value="In Stock"
                  checked={inStock}
                  onChange={() => setInStock(true)}
                />
                <label
                  htmlFor="in-stock"
                  className="add-inventory__form-label add-inventory__form-label--status"
                >
                  In stock
                </label>
              </div>
              <div className="add-inventory__form-radio-item">
                <input
                  className="add-inventory__form-input add-inventory__form-input--status"
                  id="out-of-stock"
                  type="radio"
                  name="status"
                  value="Out of Stock"
                  checked={!inStock}
                  onChange={() => setInStock(false)}
                />
                <label
                  htmlFor="out-of-stock"
                  className="add-inventory__form-label add-inventory__form-label--status"
                >
                  Out of stock
                </label>
              </div>
            </div>
            {statusEmpty && <EmptyField />}

            {inStock && (
              <div className="add-inventory__quantity">
                <label htmlFor="quantity" className="add-inventory__form-label">
                  Quantity
                </label>
                <input
                  className="add-inventory__form-input"
                  placeholder="1"
                  id="quantity"
                  type="text"
                  name="quantity"
                />
              </div>
            )}
            {(quantityEmpty || (quantityEmpty && statusEmpty)) && (
              <EmptyField />
            )}

            <label htmlFor="warehouse-id" className="add-inventory__form-label">
              Warehouse
            </label>
            <select
              className="add-inventory__form-input add-inventory__form-input--remove-default-dropdown"
              name="warehouseId"
              id="warehouse-id"
            >
              <option value="">Please select</option>
              {warehouses.map((warehouse) => {
                return <option>{warehouse.id}</option>;
              })}
            </select>
            {warehouseIdEmpty && <EmptyField />}
          </div>
        </div>

        <div className="add-inventory__action-container">
          <Link className="add-inventory__cancel-item" to={"/"}>
            Cancel
          </Link>
          <button className="add-inventory__add-item">+ Add Item</button>
        </div>
      </form>
    </section>
  );
};

export default AddInventoryForm;

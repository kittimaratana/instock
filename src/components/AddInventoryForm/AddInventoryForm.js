import "./AddInventoryForm.scss";
import { BASE_URL } from "../../utils/constant-variables";
import EmptyField from "../EmptyField/EmptyField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../ArrowBack/ArrowBack";

const AddInventoryForm = () => {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasSubmit, setHasSubmit] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [isTypeOfQuantityInt, setIsTypeOfQuantityInt] = useState(true);

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

  const handleChangeWarehouseName = (e) => setWarehouseName(e.target.value);
  const handleChangeItemName = (e) => setItemName(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeCategory = (e) => setCategory(e.target.value);
  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
    const quantityInt = parseInt(e.target.value);
    setIsTypeOfQuantityInt(Number.isInteger(quantityInt));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true);

    let fieldError = false;

    if (warehouseName === "") {
      fieldError = true;
    }

    if (itemName === "") {
      fieldError = true;
    }

    if (description === "") {
      fieldError = true;
    }

    if (category === "") {
      fieldError = true;
    }

    if (inStock) {
      if (quantity === "" || !isTypeOfQuantityInt || parseInt(quantity) <= 0) {
        fieldError = true;
      }
    }

    if (fieldError === false) {
      const warehouseSelected = warehouses.find((warehouse) => warehouse.warehouse_name === warehouseName);

      try {
        const response = await axios.post(`${BASE_URL}/api/inventories`, {
          warehouse_id: warehouseSelected.id,
          item_name: itemName,
          description: description,
          category: category,
          status: inStock ? "In Stock" : "Out of Stock",
          quantity: inStock ? quantity.toString() : "0",
        });

        setSubmitSuccess(true);
        setTimeout(() => {
          navigate("/inventory");
        }, 3000);
      } catch (error) {
        console.error(error); 
        setSubmitSuccess(false);
      }
    } else {
      setSubmitSuccess(false);
    }
  };

  let quantityErrorMessage = null;
  if (quantity === "" || !isTypeOfQuantityInt) {
    quantityErrorMessage = <EmptyField message="Please insert valid number" />;
  } else if (parseInt(quantity) < 0) {
    quantityErrorMessage = <EmptyField message="Quantity can't be negative" />;
  } else if (parseInt(quantity) === 0) {
    quantityErrorMessage = (
      <EmptyField message="Quantity can't be 0 when in stock" />
    );
  }

  return (
    <section className="add-inventory">
      <section className="add-inventory__header">
        <div className="add-inventory__header-container">
          <div className="add-inventory__header-container-arrow">
            <ArrowBack />
          </div>
          <h1 className="add-inventory__header-name">
            Add a New Inventory Item
          </h1>
        </div>
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
              className={itemName === "" && hasSubmit ? 'add-inventory__form-input add-inventory__form-input--error' : 'add-inventory__form-input'}
              placeholder="Item Name"
              id="item-name"
              type="text"
              name="itemName"
              onChange={handleChangeItemName}
            />
            {itemName === "" && hasSubmit && <EmptyField />}

            <label htmlFor="description" className="add-inventory__form-label">
              Description
            </label>
            <input
              className={description === "" && hasSubmit ? 'add-inventory__form-input add-inventory__form-input--description add-inventory__form-input--error' : 'add-inventory__form-input add-inventory__form-input--description'}
              placeholder="Please enter a brief item description..."
              id="description"
              type="text"
              name="description"
              onChange={handleChangeDescription}
            />
            {description === "" && hasSubmit && <EmptyField />}

            <label htmlFor="category" className="add-inventory__form-label">
              Category
            </label>
            <select
              className={category === "" && hasSubmit ? 'add-inventory__form-input add-inventory__form-input--remove-default-dropdown add-inventory__form-input--error' : 'add-inventory__form-input add-inventory__form-input--remove-default-dropdown'}
              name="category"
              id="category"
              onChange={handleChangeCategory}
            >
              <option value="">Please select</option>
              <option>Health</option>
              <option>Apparel</option>
              <option>Accessories</option>
              <option>Electronics</option>
              <option>Gear</option>
            </select>
            {category === "" && hasSubmit && <EmptyField />}
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

            {inStock && (
              <>
                <div className="add-inventory__quantity">
                  <label
                    htmlFor="quantity"
                    className="add-inventory__form-label"
                  >
                    Quantity
                  </label>
                  <input
                    className={quantityErrorMessage && hasSubmit ? 'add-inventory__form-input add-inventory__form-input--error' : 'add-inventory__form-input'}
                    id="quantity"
                    type="text"
                    name="quantity"
                    value={quantity}
                    onChange={handleChangeQuantity}
                  />
                </div>
                {quantityErrorMessage}
              </>
            )}

            <label htmlFor="warehouse-id" className="add-inventory__form-label">
              Warehouse
            </label>
            <select
              className={warehouseName === "" && hasSubmit ? 'add-inventory__form-input add-inventory__form-input--remove-default-dropdown add-inventory__form-input--error' : 'add-inventory__form-input add-inventory__form-input--remove-default-dropdown'}
              name="warehouseId"
              id="warehouse-id"
              onChange={handleChangeWarehouseName}
            >   
              <option value="">Please select</option>
              {warehouses.map((warehouse) => {
                return <option key={warehouse.id}>{warehouse.warehouse_name}</option>;
              })}
            </select>
            {warehouseName === "" && hasSubmit && <EmptyField />}
          </div>
        </div>

        <div className="add-inventory__action-container">
          <Link className="add-inventory__cancel-item" to={"/inventory"}>
            Cancel
          </Link>
          <button className="add-inventory__add-item">+ Add Item</button>
        </div>
        {submitSuccess && (
          <div className="add-inventory__success-message">
            Successfully added new inventory. Redirecting you to view
            inventories!
          </div>
        )}
      </form>
    </section>
  );
};

export default AddInventoryForm;

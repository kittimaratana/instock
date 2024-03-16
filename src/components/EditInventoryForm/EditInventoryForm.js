import "./EditInventoryForm.scss";
import { BASE_URL } from "../../utils/constant-variables";
import EmptyField from "../EmptyField/EmptyField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../ArrowBack/ArrowBack";

const EditInventoryForm = () => {
  const { inventoryId } = useParams();
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseId, setWarehouseId] = useState(-1);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const getWarehouseIdFromName = (warehouses, warehouseName) => {
    const currentWarehouse = warehouses.find(
      (warehouse) => warehouse.warehouse_name === warehouseName
    );
    if (currentWarehouse) {
      return currentWarehouse.id;
    }
    return -1;
  };

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const warehousesResponse = await axios.get(
          `${BASE_URL}/api/warehouses`
        );
        const inventoryResponse = await axios.get(
          `${BASE_URL}/api/inventories/${inventoryId}`
        );
        setWarehouseName(inventoryResponse.data.warehouse_name);
        setItemName(inventoryResponse.data.item_name);
        setDescription(inventoryResponse.data.description);
        setCategory(inventoryResponse.data.category);
        setInStock(inventoryResponse.data.status === "In Stock" ? true : false);
        setQuantity(inventoryResponse.data.quantity);
        setWarehouses(warehousesResponse.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setHasError(true);
      }
    };
    fetchInventoryData();
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
  const handleChangeQuantity = (e) => setQuantity(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      if (quantity === "") {
        fieldError = true;
      }
    }

    if (fieldError === false) {
      console.log(warehouseId);
      try {
        await axios.put(`${BASE_URL}/api/inventories/${inventoryId}`, {
          warehouse_id: getWarehouseIdFromName(warehouses, warehouseName),
          item_name: itemName,
          description: description,
          category: category,
          status: inStock ? "In Stock" : "Out of Stock",
          quantity: quantity,
        });

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
        {/* TODO: tune styling*/}
        <ArrowBack />
        <h1 className="add-inventory__header-name">Edit Inventory Item</h1>
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
              placeholder={itemName}
              id="item-name"
              type="text"
              name="itemName"
              value={itemName}
              onChange={handleChangeItemName}
            />
            {itemName === "" && <EmptyField />}

            <label htmlFor="description" className="add-inventory__form-label">
              Description
            </label>
            <textarea
              className="add-inventory__form-input add-inventory__form-input--description"
              placeholder={description}
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={handleChangeDescription}
            />
            {description === "" && <EmptyField />}

            <label htmlFor="category" className="add-inventory__form-label">
              Category
            </label>
            <select
              className="add-inventory__form-input add-inventory__form-input--remove-default-dropdown"
              name="category"
              id="category"
              value={category}
              onChange={handleChangeCategory}
            >
              <option value={category}>{category}</option>
              {["Health", "Apparel", "Accessories", "Electronics", "Gear"]
                .filter((filterCategory) => filterCategory !== category)
                .map((filteredCategory) => {
                  return <option>{filteredCategory}</option>;
                })}
            </select>
            {category === "" && <EmptyField />}
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
              <div className="add-inventory__quantity">
                <label htmlFor="quantity" className="add-inventory__form-label">
                  Quantity
                </label>
                <input
                  className="add-inventory__form-input"
                  placeholder={quantity}
                  id="quantity"
                  type="text"
                  name="quantity"
                  value={quantity}
                  onChange={handleChangeQuantity}
                />
              </div>
            )}
            {quantity === "" && <EmptyField />}

            <label htmlFor="warehouse-id" className="add-inventory__form-label">
              Warehouse
            </label>
            <select
              className="add-inventory__form-input add-inventory__form-input--remove-default-dropdown"
              name="warehouseId"
              id="warehouse-id"
              value={warehouseName}
              onChange={handleChangeWarehouseName}
            >
              <option>{warehouseName}</option>
              {warehouses
                .filter(
                  (warehouse) => warehouse.warehouse_name !== warehouseName
                )
                .map((warehouse) => {
                  return <option>{warehouse.warehouse_name}</option>;
                })}
            </select>
            {warehouseName === "" && <EmptyField />}
          </div>
        </div>

        <div className="add-inventory__action-container">
          <Link className="add-inventory__cancel-item" to={"/"}>
            Cancel
          </Link>
          <button className="add-inventory__add-item">Save</button>
        </div>
      </form>
    </section>
  );
};

export default EditInventoryForm;

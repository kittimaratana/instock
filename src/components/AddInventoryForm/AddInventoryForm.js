import "./AddInventoryForm.scss";
import { BASE_URL } from "../../utils/constant-variables";
import AddButton from "../AddButton/AddButton";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddInventoryForm = () => {
    //we need available warehouses for the dropdown menu otherwise it would be thousands of html code because users can create a lot of warehouses
    //for category, it is hardcoded as if the inventory tablet was empty there would be no way to add a new row of data as users will have empty category
    const [warehouses, setWarehouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [inStock, setInStock] = useState(true);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        const fetchWarehouse = async () => {
            try {
                const responseWarehouses = await axios.get(`${BASE_URL}/api/warehouses`);
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
        return <p>Unable to access warehouses right now. Please try again later.</p>;
    }

    if (isLoading) {
        return <p>Is Loading...</p>;
    }

    if (warehouses.length === 0) {
        return <p>No warehouses available</p>;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setSubmitSuccess(true);

        try {
            let quantity = "0";
            
            if(e.target.status.value==="In Stock") {
                quantity = e.target.quantity.value;
            }

            const response = await axios.post(`${BASE_URL}/api/warehouses`, {
                warehouse_id: e.target.warehouseId.value,
                item_name: e.target.itemName.value,
                description: e.target.description.value,
                category: e.target.category.value,
                status: e.target.status.value,
                quantity: quantity
            });
        } catch (error) {
            console.log(error); //modify error message -------------
        }

        //empty upload fields
        e.target.videoTitle.value = "";
        e.target.videoDescription.value = "";
    }

    return (
        <section className="add-inventory">
            <section className="add-inventory__header">
                <h1 className="add-inventory__header-name">Add a New Inventory</h1>
            </section>

            <hr className="add-inventory__divider" />

            <form onSubmit={handleSubmit}>

                <div className="add-inventory__details-container">
                    <div className="add-inventory__details add-inventory__details--tablet">
                        <h2 className="add-inventory__details-header-name">Item Details</h2>
                        <label htmlFor="item-name" className="add-inventory__form-label">Item Name</label>
                        <input className="add-inventory__form-input" placeholder="Item Name" id="item-name" type="text" name="itemName" />
                        <label htmlFor="description" className="add-inventory__form-label">Description</label>
                        <input className="add-inventory__form-input add-inventory__form-input--description" placeholder="Please enter a brief item description..." id="description" type="text" name="description" />

                        <label htmlFor="category" className="add-inventory__form-label">Category</label>
                        <select className="add-inventory__form-input add-inventory__form-input--remove-default-dropdown" name="category" id="category">
                            <option value="">Please select</option>
                            <option>Health</option>
                            <option>Apparel</option>
                            <option>Accessories</option>
                            <option>Electronics</option>
                            <option>Gear</option>
                        </select>
                    </div>

                    <hr className="add-inventory__divider add-inventory__divider--between-components" />

                    <div className="add-inventory__details">
                        <h2 className="add-inventory__details-header-name">Item Availability</h2>
                        <label className="add-inventory__form-label">Status</label>
                        <div className="add-inventory__form-radio-container">
                            <div className="add-inventory__form-radio-item">
                                <input className="add-inventory__form-input add-inventory__form-input--status" id="in-stock" type="radio" name="status" value="In Stock" onChange={(e) => setInStock(true)} />
                                <label htmlFor="in-stock" className="add-inventory__form-label add-inventory__form-label--status">In stock</label>
                            </div>
                            <div className="add-inventory__form-radio-item">
                                <input className="add-inventory__form-input add-inventory__form-input--status" id="out-of-stock" type="radio" name="status" value="Out of Stock" onChange={(e) => setInStock(false)} />
                                <label htmlFor="out-of-stock" className="add-inventory__form-label add-inventory__form-label--status">Out of stock</label>
                            </div>
                        </div>

                        {inStock && (
                            <div>
                                <label htmlFor="quantity" className="add-inventory__form-label">Quantity</label>
                                <input className="add-inventory__form-input" placeholder="1" id="quantity" type="text" name="quantity" />
                            </div>
                        )}

                        <label htmlFor="warehouse-id" className="add-inventory__form-label">Warehouse</label>
                        <select className="add-inventory__form-input add-inventory__form-input--remove-default-dropdown" name="warehouseId" id="warehouse-id">
                            <option value="">Please select</option>
                            {warehouses.map((warehouse) => { return (<option>{warehouse.id}</option>) })}
                        </select>
                    </div>
                </div>

                <div className="add-inventory__action-container">
                    <Link className="add-inventory__cancel-item" to={"/"}>
                        Cancel
                    </Link>
                    <button className="add-inventory__add-item">+Add Item</button>
                </div>
            </form>
        </section>
    )
};

export default AddInventoryForm;

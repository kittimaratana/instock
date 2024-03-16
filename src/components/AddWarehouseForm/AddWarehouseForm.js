import "./AddWarehouseForm.scss";
import { useState } from "react";
import ArrowBack from "../ArrowBack/ArrowBack";

const CreateNewWarehouse = () => {
    const [warehouse_name, setWarehouse_name] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [contact_name, setContact_name] = useState('');
    const [contact_position, setContact_position] = useState('');
    const [contact_phone, setContact_phone] = useState('');
    const [contact_email, setContact_email] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newWarehouse = { warehouse_name };
        //validation here
        console.log(newWarehouse);


    }

    return (
        <section className="add-warehouse">
            <section className="add-warehouse__header">
            <ArrowBack/>
                <h1 className="warehouse__header-name">Add New Warehouse</h1>
            </section>

            <hr className="warehouse__divider" />

            <form onSubmit={handleSubmit}>

                <div className="add-warehouse__details-container">
                    <div className="add-warehouse__details">
                        <h2>Warehouse Details</h2>
                        <label className="add-warehouse__form-label">Warehouse Name:<br /></label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="Warehouse Name"
                            type="text"
                            required
                            value={warehouse_name}
                            onChange={(e) => setWarehouse_name(e.target.value)}
                        />


                        <label className="add-warehouse__form-label">Address:  </label>
                        <input 
                            className="add-warehouse__form-input"
                            placeholder="Street address"
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />


                        <label className="add-warehouse__form-label">City:</label>
                        <input
                        className="add-warehouse__form-input"    
                        placeholder="City"
                            type="text"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />


                        <label className="add-warehouse__form-label">Country: </label>
                        <input
                        className="add-warehouse__form-input"
                        placeholder="Country"
                            type="text"
                            required
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />


                    </div>

                    <div className="add-warehouse__details">

                    <h2>Contact Details</h2>
                        <label className="add-warehouse__form-label" >Contact Name:
                            <input
                            className="add-warehouse__form-input"
                                placeholder="Contact Name"
                                type="text"
                                required
                                value={contact_name}
                                onChange={(e) => setContact_name(e.target.value)}
                            />
                        </label>

                        <label className="add-warehouse__form-label">Contact Position:
                            <input
                            className="add-warehouse__form-input"
                                placeholder="Contact Position"
                                type="text"
                                required
                                value={contact_position}
                                onChange={(e) => setContact_position(e.target.value)}
                            />
                        </label>

                        <label className="add-warehouse__form-label">Phone Number:
                            <input
                            className="add-warehouse__form-input"
                                placeholder="Phone Number"
                                type="text"
                                required
                                value={contact_phone}
                                onChange={(e) => setContact_phone(e.target.value)}
                            />
                        </label>

                        <label className="add-warehouse__form-label">Email:
                            <input
                            className="add-warehouse__form-input"
                                placeholder="Email"
                                type="text"
                                required
                                value={contact_email}
                                onChange={(e) => setContact_email(e.target.value)}
                            />
                        </label>


                    </div>

                </div>



                <div className="add-warehouse__buttons-group">

                <a href="/"> Cancel </a>
                <button className="add-warehouse__add-button">Add Warehouse</button>
                
                </div>
                
            </form>
        </section>
    );
}

export default CreateNewWarehouse;
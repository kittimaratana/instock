import "./EditWarehouseForm.scss";
import { BASE_URL } from "../../utils/constant-variables";
import EmptyField from "../EmptyField/EmptyField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../ArrowBack/ArrowBack";

const EditWarehouseForm = () => {
    const { warehouse_Id } = useParams();
    const [warehouse_name, setWarehouse_name] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [contact_name, setContact_name] = useState('');
    const [contact_position, setContact_position] = useState('');
    const [contact_phone, setContact_phone] = useState('');
    const [contact_email, setContact_email] = useState('');

    const [isPending, setIsPending] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

         // Convert the phone number to the desired format
         const formattedPhone = formatPhoneNumber(contact_phone);
        // Validation checks
        if (
            !warehouse_name ||
            !address ||
            !city ||
            !country ||
            !contact_name ||
            !contact_position ||
            !contact_phone ||
            !validatePhone(formattedPhone) ||
            !contact_email ||
            !validateEmail(contact_email)
        ) {
            // If any field is empty or email/phone is not valid, return without submitting
            console.error('Please fill out all fields and provide a valid email address and phone number.');
            return;
        }

        const newWarehouse = {
            warehouse_name,
            address,
            city,
            country,
            contact_name,
            contact_position,
            contact_phone: formattedPhone,
            contact_email
        };

        setIsPending(true);

        try {
            // Post the newWarehouse object to the DB via API call
            const response = await fetch(`${BASE_URL}/api/warehouses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWarehouse)
            }).then(setIsPending(false),
                   );

            if (response.ok) {
                // Handle successful add
                console.log(response.statusText);
                setSubmitSuccess(true);
                setTimeout(() => {
                    navigate("/");
                }, 3000)

            } else {
                // Handle error response from API
                console.error('Failed to add warehouse:', response.statusText);
                setSubmitSuccess(false)
            }
        } catch (error) {
            console.error('Error adding warehouse:', error);
            setSubmitSuccess(false);
        }
    };

    // Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Function to validate phone number format
    const validatePhone = (phone) => {
        // Regular expression for validating phone number format
        const phoneRegex = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    };

    // Function to format phone number to +1 (xxx) xxx-xxxx
    const formatPhoneNumber = (phone) => {
        // Remove any non-numeric characters
        const numbers = phone.replace(/\D/g, '');

        // Add country code and format
        let formattedNumber = '+1 (' + numbers.substring(0, 3) + ') ' + numbers.substring(3, 6) + '-' + numbers.substring(6, 10);

        return formattedNumber;

    };






    return (
        <section className="add-warehouse">
            <section className="add-warehouse__header">
                <ArrowBack />
                <h1 className="add-warehouse__header-name">Add New Warehouse</h1>
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

                    <hr className="add-warehosue__divider add-warehosue__divider--between-components" />

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
                    <div className="add-warehouse__cancel-button">
                        <a href="/"> Cancel </a>
                    </div>

                    {!isPending && <button className="add-warehouse__add-button">+ Add Warehouse</button>}
                    {isPending && <a><button disabled className="add-warehouse__add-button">Addding Warehouse...</button></a>}
                    {submitSuccess && (
                        <div className="add-warehouse__success-message">Successfully added new warehouse. Redirecting you to the main page...</div>
                    )}

                </div>

            </form>
        </section>
    );

}

export default EditWarehouseForm;
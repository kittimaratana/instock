import "./AddWarehouseForm.scss";
import { BASE_URL } from "../../utils/constant-variables";
import EmptyField from "../EmptyField/EmptyField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
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

    const [hasSubmit, setHasSubmit] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmit(true);
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

    let phoneErrorMessage = null;

    const phoneRegex = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/
    if (contact_phone === "" || !phoneRegex.test(formatPhoneNumber(contact_phone))) {
        
        phoneErrorMessage = <EmptyField message="Please provide valid number" />;
    } 






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

                            value={warehouse_name}
                            onChange={(e) => setWarehouse_name(e.target.value)}
                        />
                        {warehouse_name === "" && hasSubmit && <EmptyField />}


                        <label className="add-warehouse__form-label">Address:  </label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="Street address"
                            type="text"

                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {address === "" && hasSubmit && <EmptyField />}


                        <label className="add-warehouse__form-label">City:</label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="City"
                            type="text"

                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {city === "" && hasSubmit && <EmptyField />}


                        <label className="add-warehouse__form-label">Country: </label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="Country"
                            type="text"

                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        {country === "" && hasSubmit && <EmptyField />}

                    </div>

                    <hr className="add-warehouse__divider add-warehouse__divider--between-components" />

                    <div className="add-warehouse__details">

                        <h2>Contact Details</h2>
                        <label className="add-warehouse__form-label" >Contact Name: </label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="Contact Name"
                            type="text"

                            value={contact_name}
                            onChange={(e) => setContact_name(e.target.value)}
                        />
                        {contact_name === "" && hasSubmit && <EmptyField />}


                        <label className="add-warehouse__form-label">Contact Position: </label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="Contact Position"
                            type="text"

                            value={contact_position}
                            onChange={(e) => setContact_position(e.target.value)}
                        />
                        {contact_position === "" && hasSubmit && <EmptyField />}


                        <label className="add-warehouse__form-label">Phone Number:</label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="Phone Number"
                            type="text"

                            value={contact_phone}
                            onChange={(e) => setContact_phone(e.target.value)}
                        />
                        {hasSubmit && phoneErrorMessage }
                        


                        <label className="add-warehouse__form-label">Email:</label>
                        <input
                            className="add-warehouse__form-input"
                            placeholder="Email"
                            type="text"

                            value={contact_email}
                            onChange={(e) => setContact_email(e.target.value)}
                        />
                        {contact_email === "" && hasSubmit && <EmptyField />}



                    </div>

                </div>



                <div className="add-warehouse__buttons-group">
                    <div className="add-warehouse__cancel-button">
                        <a href="/"> Cancel </a>
                    </div>

                    {!isPending && <button className="add-warehouse__add-button">+ Add Warehouse</button>}
                </div>
                {submitSuccess && (
                    <div className="add-warehouse__success-message">Successfully added new warehouse. Redirecting you to the main page...</div>
                )}



            </form>
        </section>
    );

}

export default CreateNewWarehouse;
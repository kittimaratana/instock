import "./EditWarehouseForm.scss";
import { BASE_URL } from "../../utils/constant-variables";
import EmptyField from "../EmptyField/EmptyField";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import ArrowBack from "../ArrowBack/ArrowBack";


const EditWarehouse = () => {
    //useParams to get the warehoues id
    const { warehouseId } = useParams();

    //defining all useStates for forms and validation
    const [warehouse_name, setWarehouse_name] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [contact_name, setContact_name] = useState('');
    const [contact_position, setContact_position] = useState('');
    const [contact_phone, setContact_phone] = useState('');
    const [contact_email, setContact_email] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [hasSubmit, setHasSubmit] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const navigate = useNavigate();

    //GET the warehouse details to populate the forms
    useEffect(() => {
        const fetchWarehouseData = async () => {
            try {

                const wareHouseResponse = await axios.get(
                    `${BASE_URL}/api/warehouses/${warehouseId}`

                );
                setWarehouse_name(wareHouseResponse.data.warehouse_name);
                setCity(wareHouseResponse.data.city);
                setAddress(wareHouseResponse.data.address);
                setCountry(wareHouseResponse.data.country);
                setContact_name(wareHouseResponse.data.contact_name);
                setContact_position(wareHouseResponse.data.contact_position);
                setContact_phone(wareHouseResponse.data.contact_phone);
                setContact_email(wareHouseResponse.data.contact_email);

                setIsLoading(false)


            } catch (error) {
                setIsLoading(false);
                setHasError(true);
            }
        };
        fetchWarehouseData();
    }, []);

    if (hasError) {
        return (
            <p>Unable to access warehouses right now. Please try again later.</p>
        );
    }

    if (isLoading) {
        return <p>Is Loading...</p>;
    }

    //submit handler to update warehouse to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmit(true);
        // Convert the phone number to the desired format
        const formattedPhone = formatPhoneNumber(contact_phone);
        // Validation checks for all required field
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
            const response = await fetch(`${BASE_URL}/api/warehouses/${warehouseId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWarehouse)
            }).then(setIsPending(false),
            );

            if (response.ok) {
                // Handle successful add
                setSubmitSuccess(true);
                setTimeout(() => {
                    navigate(`/warehouse/${warehouseId}`);
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
    //Variable and funciton to show customised error message
    let phoneErrorMessage = null;
    const phoneRegex = /^\+\d{1,2}\s\(\d{3}\)\s\d{3}-\d{4}$/
    if (contact_phone === "" || !phoneRegex.test(formatPhoneNumber(contact_phone))) {

        phoneErrorMessage = <EmptyField message="Please provide valid number" />;
    }
    //HTML code for edit warehouse component
    return (
        <section className="edit-warehouse">
            <section className="edit-warehouse__header">
                <ArrowBack />
                <h1 className="edit-warehouse__header-name">Edit Warehouse</h1>
            </section>

            <hr className="warehouse__divider" />

            <form onSubmit={handleSubmit}>

                <div className="edit-warehouse__details-container">
                    <div className="edit-warehouse__details">
                        <h2>Warehouse Details</h2>
                        <label htmlFor="warehouse-name" className="edit-warehouse__form-label">Warehouse Name:<br /></label>
                        <input
                            className={warehouse_name === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="Warehouse Name"
                            type="text"
                            id="warehouse-name"
                            value={warehouse_name}
                            onChange={(e) => setWarehouse_name(e.target.value)}
                        />
                        {warehouse_name === "" && hasSubmit && <EmptyField />}


                        <label htmlFor="warehouse-address" className="edit-warehouse__form-label">Address:  </label>
                        <input
                            className={address === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="Street editress"
                            type="text"
                            id="warehouse-address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {address === "" && hasSubmit && <EmptyField />}


                        <label htmlFor="warehouse-city" className="edit-warehouse__form-label">City:</label>
                        <input
                            className={city === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="City"
                            type="text"
                            id="warehouse-city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        {city === "" && hasSubmit && <EmptyField />}


                        <label htmlFor="warehouse-country" className="edit-warehouse__form-label">Country: </label>
                        <input
                            className={country === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="Country"
                            type="text"
                            id="warehouse-country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        {country === "" && hasSubmit && <EmptyField />}

                    </div>

                    <hr className="edit-warehouse__divider edit-warehouse__divider--between-components" />

                    <div className="edit-warehouse__details">

                        <h2>Contact Details</h2>
                        <label htmlFor="warehouse-contact-name" className="edit-warehouse__form-label" >Contact Name: </label>
                        <input
                            className={contact_name === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="Contact Name"
                            type="text"
                            id="warehouse-contact-name"
                            value={contact_name}
                            onChange={(e) => setContact_name(e.target.value)}
                        />
                        {contact_name === "" && hasSubmit && <EmptyField />}


                        <label htmlFor="warehouse-contact-position" className="edit-warehouse__form-label">Contact Position: </label>
                        <input
                            className={contact_position === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="Contact Position"
                            type="text"
                            id="warehouse-contact-position"
                            value={contact_position}
                            onChange={(e) => setContact_position(e.target.value)}
                        />
                        {contact_position === "" && hasSubmit && <EmptyField />}


                        <label htmlFor="warehouse-phone-number" className="edit-warehouse__form-label">Phone Number:</label>
                        <input
                            className={contact_phone === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="Phone Number"
                            type="text"
                            id="warehouse-phone-number"
                            value={contact_phone}
                            onChange={(e) => setContact_phone(e.target.value)}
                        />
                        {hasSubmit && phoneErrorMessage}



                        <label htmlFor="warehouse-email" className="edit-warehouse__form-label">Email:</label>
                        <input
                            className={contact_email === "" && hasSubmit ? 'edit-warehouse__form-input edit-warehouse__form-input--error' : 'edit-warehouse__form-input'}
                            placeholder="Email"
                            type="text"
                            id="warehouse-email"
                            value={contact_email}
                            onChange={(e) => setContact_email(e.target.value)}
                        />
                        {contact_email === "" && hasSubmit && <EmptyField />}

                    </div>

                </div>



                <div className="edit-warehouse__buttons-group">
                    <div className="edit-warehouse__cancel-button">
                        <a href="/"> Cancel </a>
                    </div>

                    {!isPending && <button className="edit-warehouse__add-button">Save</button>}
                </div>
                {submitSuccess && (
                    <div className="edit-warehouse__success-message">Successfully updated warehouse. Redirecting you to the {warehouse_name} warehouse</div>
                )}

            </form>
        </section>
    );

}

export default EditWarehouse;
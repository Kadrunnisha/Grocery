import './addaddress.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [pincode, setPincode] = useState("");
    const [locality, setLocality] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [landmark, setLandmark] = useState("");
    const [alternateNumber, setAlternateNumber] = useState("");
    const [addressType, setAddressType] = useState(""); // Radio button value
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate required fields
        if (!name || !number || !pincode || !locality || !area || !city || !state || !addressType) {
            setError("Please fill in all required fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/api/address", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: localStorage.getItem("tokken"), // Ensure this key matches what you use
                    name: name,
                    number: number,
                    pincode: pincode,
                    locality: locality,
                    area: area,
                    city: city,
                    state: state,
                    landmark: landmark,
                    alternate_number: alternateNumber,
                    
                }),
            });

            const result = await response.json();
            
            if (result === "do login first") {
                navigate("/signin");
            } else if (result.success) {
                // Redirect after successful submission
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate("/");

            } else {
                setError(result.message || "Something went wrong. Please try again.");
            }

        } catch (error) {
            console.error("Error submitting the address:", error);
            setError("Error submitting the address. Please try again later.");
        }
    };

    return (
        <div className='abox'>
            <div className="addadress">
                <div className='n'><p>Manage Address</p></div>
                <div className='a'>
                    <div className='addbox'>
                        <div className='a1'><p>Add New Address</p></div>
                        <div className='a2'>
                            <p> 
                                <FontAwesomeIcon icon={faLocationDot} className='io' />
                                Current Location
                            </p>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className='b'>
                                <input
                                    type='text'
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder="Phone Number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                            <div className='b'>
                                <input
                                    type='text'
                                    placeholder='Pincode'
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder='Locality'
                                    value={locality}
                                    onChange={(e) => setLocality(e.target.value)}
                                />
                            </div>
                            <div className='bx'>
                                <input
                                    type='text'
                                    className='nam'
                                    placeholder='Address (Area and Street)'
                                    value={area}
                                    onChange={(e) => setArea(e.target.value)}
                                />
                            </div>
                            <div className='b'>
                                <input
                                    type='text'
                                    placeholder='City'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder='State'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                            <div className='b'>
                                <input
                                    type='text'
                                    placeholder='Landmark (Optional)'
                                    value={landmark}
                                    onChange={(e) => setLandmark(e.target.value)}
                                />
                                <input
                                    type='text'
                                    placeholder='Alternate Number (Optional)'
                                    value={alternateNumber}
                                    onChange={(e) => setAlternateNumber(e.target.value)}
                                />
                            </div>
                            <div className='c1'><p className='c'>Address Type</p></div>
                            <div className='cd'>
                                <input 
                                    type="radio" 
                                    name="addressType" 
                                    value="Home" 
                                    checked={addressType === "Home"}
                                    onChange={(e) => setAddressType(e.target.value)}
                                />
                                <p>Home</p>
                                <input 
                                    type="radio" 
                                    name="addressType" 
                                    value="Office" 
                                    checked={addressType === "Office"}
                                    onChange={(e) => setAddressType(e.target.value)}
                                />
                                <p>Office</p>
                            </div>
                            <div className='submit-button'>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAddress;

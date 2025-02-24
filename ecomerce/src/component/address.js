import React, { useEffect, useState } from "react";
import "./address.css";
import Accountnav from "./accountnav.js";
import { Link } from "react-router-dom";

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // Example of client-side fetch request
const fetchAddresses = async () => {
    try {
        const email = localStorage.getItem("tokken"); // Replace with the actual email or retrieve from localStorage
        const response = await fetch("http://localhost:8000/api/addresses", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (result.success) {
            console.log("Addresses:", result.addresses);
            setAddresses(result.addresses);
        } else {
            console.error("Error:", result.message);
        }
    } catch (error) {
        console.error("Error fetching addresses:", error);
    }
};

fetchAddresses();

 }, []);

    return (
        <div className="addk">
            <Accountnav />
            <div className="inadd" >
                <div className="ms">
                    <p>Manage Address</p>
                    
                </div>
                <div className="ms"> <Link to="/addaddress" className="l"> + Add New Address</Link></div>
                <div className="address-list">
                    {addresses.length > 0 ? (
                        addresses.map((address, index) => (
                            <div key={index} className="address-item">
                              <div className="di1"><p>{address.Name}</p><p> {address.Phone}</p></div>
                                <div className="di0">
                                <p>{address.Locality}</p>
                                <p>{address.Area}</p>
                                <p> {address.City}</p>
                                <p>{address.State}</p>
                                <p>{address.Landmark}</p>
                                <p>-{address.Pincode}</p>
                               </div>
                                
                            </div>
                        ))
                    ) : (
                        <p>No addresses found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Address;

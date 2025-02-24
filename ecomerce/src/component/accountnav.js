import React from "react";
import './accountnav.css';
import { Link } from "react-router-dom";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser,faBagShopping,faWallet} from '@fortawesome/free-solid-svg-icons'
const Accountnav=()=>{
    return(
        <>
        <div className="nav_box">
            <div className="b1">
            <FontAwesomeIcon icon={faUser} className="b1i" />
            <div className="b1c">
                <p className="b1c1">Hello,</p>
                <p className="b1c2">Grocery customer</p>
            </div>
            </div>
            <div className="b2">
                <div className="b2c1">
                <FontAwesomeIcon icon={faBagShopping} className="b2c1i" />
                <p>MY ORDERS </p>
                </div>
                <div className="b2c2">
                    <div className="b2c21">
                    <FontAwesomeIcon icon={faUser}  className="b2c21i"/>
                    <p>ACCOUNT SETTINGS</p>
                    </div>
                    <div className="b2c22"><Link to="/profile"><p>Profile Information</p></Link></div>
                    <div className="b2c23"> <Link to="/address"><p> Manage Address</p></Link></div>
                </div>
                <div className="b2c2"> 
                    <div className="b2c21">
                    <FontAwesomeIcon icon={faWallet}  className="b2c21i"/>
                    <p>MY STUFFS</p>
                    </div>
                    <div >
                        <div className="b2c22"><p>My Copuns</p></div>
                        <div className="b2c22"><p> My wishlist</p></div>
                        <div className="b2c22"><p>My Reviews and Ratings</p></div>
                        <div className="b2c22"><p>All Notifications</p></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Accountnav;
import "./nav.css";
import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping, faChevronDown, faLocationDot, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { createContexts } from "../context/context.js";

const api_endpoint = "https://api.opencagedata.com/geocode/v1/json";
const api_key = "f4cf20d70ff74aa4b763a298ad5a58ab"; 
const Nav = () => {
  const [location_click, setlocation_click] = useState(false);
  const [location, setlocation] = useState("Enter Location");
  const [location2, setlocation2] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [cart, setCart] = useState([]);
  const [on, seton] = useState(false);
  const [acc, setacc] = useState(null);

  const history = useNavigate();
  const mail = useContext(createContexts);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    const acc = localStorage.getItem("tokken");
    if (acc) {
      mail.setmail(acc);
      setacc(acc);
    } else {
      setacc(null);
    }
  }, []); // Run only once on mount

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cartfind", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: localStorage.getItem("tokken") }),
        });

        const result = await response.json();
        setCart(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []); // Fetch cart data on mount

  useEffect(() => {
    let itemCount = 0;
    if (Array.isArray(cart)) {
      cart.forEach((item) => (itemCount += item.qun));
    }
    localStorage.setItem("iteam", itemCount);
  }, [cart]); // Update cart count when cart changes

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/logout", {
        method: "DELETE",
      });
      const data = await response.json();
      if (data) {
        localStorage.clear();
        history("/");
        window.location.reload();
        alert("You have logged out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchLocationData = () => {
    if (!latitude || !longitude) return;

    const locationQueryString = `${latitude},${longitude}`;
    const apiRequestUrl = `${api_endpoint}?key=${api_key}&q=${locationQueryString}&pretty=1`;

    fetch(apiRequestUrl)
      .then((response) => response.json())
      .then((data) => {
        setlocation(data.results[0].formatted.substring(0, 10) + "...");
        setlocation2(data.results[0].formatted);
        setlocation_click(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  };

  const getCurrentLocation = () => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          fetchLocationData();
        });
      } else if (result.state === "denied") {
        alert("Please enable location access.");
      }
    });
  };

  mail.setadd(location2);

  return (
    <>
      <div className="replace_navbar"></div>
      <div className="navbar_box">
        <div className="logo">
          <Link to="/">
            <label>Grocery.com</label>
          </Link>
        </div>

        <div className="location">
          <a onClick={() => setlocation_click(!location_click)}>
            <p>{location}</p>
            <FontAwesomeIcon icon={faChevronDown} className="i" />
          </a>
          {location_click && (
            <>
              <div className="triangle"></div>
              <div className="loc_box">
                <div className="b1">
                  <FontAwesomeIcon icon={faLocationDot} className="b3i" />
                  <div className="b4">To deliver as quickly as possible, we need your current location</div>
                </div>
                <div className="b2">
                  <Link to="/addaddress" className="but1" onClick={() => setlocation_click(false)} >
                    Type Manually
                  </Link>
                  <a href="#" className="but2" onClick={getCurrentLocation}>
                    Current Location
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="searchbar_box">
          <div className="box">
            <li className="icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </li>
            <li className="input_box">
              <input type="text" className="input" placeholder="Search for Products, Brands and More" />
            </li>
          </div>
        </div>

        <div className="login">
          {!mail.mail ? (
            <Link to="/login" onClick={()=>{window.scrollTo({ top: 0, behavior: "smooth" })}}>
              <a href="#">Login</a>
            </Link>
          ) : (
            <div className="account">
              <div className="ac" onClick={() => seton(!on)}>
                <p>Account</p> <FontAwesomeIcon icon={faCaretDown} className="a-i" />
              </div>
              {on && (
                <div className="account-list">
                  <Link to="/profile" onClick={() => seton(false)}>
                    <p>My Profile</p>
                  </Link>
                  <Link to="/orders" onClick={() => seton(false)}>
                    <p>My Orders</p>
                  </Link>
                  <Link 
  to="/address" 
  onClick={() => { 
    seton(false); 
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }}
>
  <p>Saved Address</p>
</Link>

                  <p onClick={logout}>Log Out</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="cart_container">
          <div className="circle">{localStorage.getItem("iteam")}</div>
          <div className="cart">
            <Link to="/cart" onClick={()=>{window.scrollTo({ top: 0, behavior: "smooth" })}}>
              <FontAwesomeIcon icon={faCartShopping} className="i" />
              <p>Cart</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;

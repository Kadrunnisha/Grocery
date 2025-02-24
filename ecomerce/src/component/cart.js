import { useEffect, useState, useContext } from "react";
import React from "react";
import "./cart.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { createContexts } from "../context/context.js";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const mail = useContext(createContexts);
  const history = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [iteam, setIteam] = useState(0);

  // Function to handle quantity change
  const handleQuantityChange = async (id, newQuantity) => {
    try {
      const response = await fetch("http://localhost:8000/api/cartadd", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem("tokken"),
          id: id,
          q: newQuantity
        }),
      });

      const result = await response.json();
      console.log(result);

      // Update cart state based on response
      if (newQuantity === 0) {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
      } else {
        setCart(prevCart => prevCart.map(item =>
          item._id === id ? { ...item, qun: newQuantity } : item
        ));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to remove an item
  const removeItem = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/api/removeiteam", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem("tokken"),
          id: id
        }),
      });

      const result = await response.json();
      console.log(result);

      // Update cart after removal
      setCart(prevCart => prevCart.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to place an order
  const placeOrder = async () => {
    try {
      const cartResponse = await fetch("http://localhost:8000/api/cartorder", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem("tokken"),
        }),
      });
      const cartResult = await cartResponse.json();
      const orders = cartResult;

      const orderResponse = await fetch("http://localhost:8000/api/orders", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orders: [orders],
          email: localStorage.getItem("tokken")
        }),
      });

      await fetch("/api/deletecart", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem("tokken"),
        }),
      });

      const orderResult = await orderResponse.json();
      console.log(orderResult);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch cart data initially
  useEffect(() => {
    if (!mail.mail) {
      history("/login"); // Redirect user to login page if not logged in
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/cartfind", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: localStorage.getItem("tokken"),
          }),
        });

        const result = await response.json();
        console.log(result);
        setCart(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [0]);

  // Recalculate total and item count whenever cart changes
  useEffect(() => {
    let totalPrice = 0;
    let itemCount = 0;

    cart.forEach(item => {
      itemCount += item.qun;
      totalPrice += item.price * item.qun;
    });

    setIteam(itemCount);
    mail.sett(itemCount);
    localStorage.setItem("iteam", itemCount);
    setTotal(totalPrice);
  }, [cart]);

  return (
    <>
      <div className="product_container-cart">
        <div className="product_main_container-cart">
          <div className="heading-cart">
            <p>Cart</p>
          </div>

          <div className="product_box-cart">
            <div className="cart_prodrucet">
              {cart.map((item) => (
                <div key={item._id} className="element">
                  <div className="element_in">
                    <div className="img">
                      <img src={`http://localhost:8000${item.image}`} className="image" />
                    </div>
                    <div className="timer">
                      <FontAwesomeIcon icon={faStopwatch} className="w" />
                      <p>8 mins</p>
                    </div>
                    <div className="title">
                      <p>{item.name.substring(0, 50) + "..."}</p>
                    </div>
                    <div className="weight">
                      <p>{item.quantity}</p>
                    </div>
                    <div className="price_box">
                      <div className="price">
                        <div className="y">
                          <FontAwesomeIcon icon={faIndianRupeeSign} className="r" />
                          <p>{item.price}</p>
                        </div>
                        <div className="cut_price">
                          <FontAwesomeIcon icon={faIndianRupeeSign} className="rc" />
                          <p>{item.cutprice}</p>
                        </div>
                      </div>
                      <div className="add">
                        <div className="d">
                          <div className="qun">
                            <p className="in" onClick={() => handleQuantityChange(item._id, item.qun - 1)}>-</p>
                            <p>{item.qun}</p>
                            <p className="in" onClick={() => handleQuantityChange(item._id, item.qun + 1)}>+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="remove">
                      <div onClick={() => removeItem(item._id)}>Remove</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="total_price_conatiner">
              <div className="price_heading">Price Details</div>
              <div className="price-details">
                <div>
                  <p>Price ({iteam} items)</p>
                  <p><FontAwesomeIcon icon={faIndianRupeeSign} className="r" />{total}</p>
                </div>
                <div>
                  <p>Discount</p>
                  <p>0</p>
                </div>
                <div>
                  <p>Delivery Charges</p>
                  <p>Free</p>
                </div>
              </div>
              <div className="total_price">
                <div>
                  <p>TOTAL</p>
                  <p><FontAwesomeIcon icon={faIndianRupeeSign} className="r" />{total}</p>
                </div>
              </div>
              <div className="place_order">
                <div onClick={placeOrder}>PLACE ORDER</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;


import "./slid.css";
import { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import { createContexts } from "../context/context.js";

const ProductCard = ({ item }) => {
  const [add, setAdd] = useState(0);
  const mail = useContext(createContexts);
  const [totalItem, setTotalItem] = useState(0);

  useEffect(() => {
    const quantity = async (id) => {
      try {
        const response = await fetch("http://localhost:8000/api/quantity", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: localStorage.getItem("tokken"),
            id: id
          }),
        });

        const result = await response.json();
        setAdd(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    quantity(item._id);
  }, [item._id]);

  const cartAdd = async (id, q) => {
    try {
      const response = await fetch("http://localhost:8000/api/cartadd", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem("tokken"),
          id: id,
          q: q
        }),
      });

      const result = await response.json();
      // localStorage.setItem("iteam",localStorage.getItem("iteam"))
      console.log(result+"added");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
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

        let totalQuantity = 0;
        let totalItems = 0;

        for (let i = 0; i < result.length; i++) {
          totalItems += result[i].qun + 1;
          totalQuantity += result[i].price * (result[i].qun + 1);
        }

        mail.sett(totalItems);
        setTotalItem(totalItems);
        localStorage.setItem("iteam", totalItems);
        console.log("Total items:", result.length);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (mail.mail !== null) {
      fetchData();
    }
  }, [mail]);

  return (
    <div className="element">
      <div className="element_in">
        <div className="img">
          <img src={`http://localhost:8000${item.image}`} className="image" alt={item.name} />
        </div>
        <div className="timer">
          <FontAwesomeIcon icon={faStopwatch} className="w" /><p>8 mins</p>
        </div>
        <div className="title">
          <p>{item.name.substring(0, 50) + "..."}</p>
        </div>
        <div className="weight"><p>{item.quantity}</p></div>
        <div className="price_box">
          <div className="price">
            <div className="y">
              <FontAwesomeIcon icon={faIndianRupeeSign} className="r" /><p>{item.price}</p>
            </div>
            <div className="cut_price">
              <FontAwesomeIcon icon={faIndianRupeeSign} className="rc" /><p>{item.cutprice}</p>
            </div>
          </div>
          <div className="add">
            {add === 0 ? (
              <div className="d" onClick={() => {
                setAdd(1);
                mail.sett(mail.t + 1);
                cartAdd(item._id, 1);
              }}>Add</div>
            ) : (
              <div className="d">
                <p onClick={() => {
                  setAdd(prevAdd => prevAdd - 1);
                  cartAdd(item._id, add - 1);
                }}>-</p>
                <p>{add}</p>
                <p onClick={() => {
                  setAdd(prevAdd => prevAdd + 1);
                  cartAdd(item._id, add + 1);
                }}>+</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

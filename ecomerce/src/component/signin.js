import "./login.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {createContexts} from  "../context/context.js";
function Signin() {
  const cart=useContext(createContexts);
  console.log(cart);
  const history=useNavigate();
  const [pas, setPas] = useState("password");
  const [password, setPassword] = useState();
const[name,setName]=useState();
const[phone,setPhone]=useState();
const[email,setEmail]=useState();
async function submit(e) {
  
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8000/api/signin", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
                name:name,
                 phone_no:phone,
                 email:email,
                 password:password
      }),
    });

    const result = await response.json();

    console.log(result); // This will log the result to the console

    // Now you can handle the result based on your application's logic
    if (result == "exists") {
      // Handle the case where the user exists
      console.log("User exits");
    } else if (result == "notexists") {
      localStorage.setItem("tokken",email);
      cart.setmail(email);
      history("/");
      // Handle the case where the user does not exist
      console.log("User does not exist");
    } else {
      // Handle other cases or errors
      console.log("Unexpected result");
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error("Error:", error);
  }
}

console.log(cart);
  return (
    <>
      <div className="login_body">
        <div className="login_page">
          {/* <div className="cut">
            <FontAwesomeIcon icon={faTimes} className="cut_cross" />
          </div> */}

          <div className="label">
            <p>Grocery.com</p>
          </div>
          <div className="para">
            <p>India's last-minute app</p>
          </div>
          <div className="form">
            <form>
              {/* ... other form fields ... */}
              <div className="email">
                
                <label>Name</label>
               
                <input  type="name"  onChange={(e)=>{setName(e.target.value)}} placeholder="name"/* value={email} onChange={(e) => setEmail(e.target.value)} */ />
              </div>
              <div className="email">
                
                <label>Phone No:</label>
               
                <input  type="tel" onChange={(e)=>{setPhone(e.target.value)}} placeholder="number"/* value={email} onChange={(e) => setEmail(e.target.value)} */ />
              </div>

              <div className="email">
                
                <label>Login:</label>
               
                <input type="email"  onChange={(e)=>{setEmail(e.target.value)}} placeholder="email"/* value={email} onChange={(e) => setEmail(e.target.value)} */ />
              </div>
              <div className="email">
                <label>Password:</label>
                <input
                  type={pas}
                  placeholder="Password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <FontAwesomeIcon
                  className="eye"
                  icon={pas === "password" ? faEye : faEyeSlash}
                  onClick={(e) => {
                    e.preventDefault();
                    setPas(pas === "password" ? "text" : "password");
                  }}
                />
              </div>
              <div className="check_box">
                <input type="checkbox" className="check" />
                <div className="r">Remember Me</div>
              </div>
              <div className="but_login">
                <input type="submit" onClick={submit}/>
              </div>
            </form>
          </div>
          <div className="newuser">
            <p> Have Account? <Link to="/login">Log in</Link> </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;

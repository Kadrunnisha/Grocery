
import "./login.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash,faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const history=useNavigate();
  const [pass, setPass] = useState("password");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  async function submit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
  
      const result = await response.json();
      console.log(result); // This will log the result to the console
  
      // Now you can handle the result based on your application's logic
      if (result === "exists") {
        history("/", { state: { id: email } });
        // Handle the case where the user exists
        console.log("User exists");
      } else if (result === "notexists") {
        alert("User does not exist");
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
  

  return (
    < >
    <div className="login_body">
     <div className="login_page">
        {/* <div className="cut">
      
        <FontAwesomeIcon icon={faXmark}  className="cut_cross" />
        </div> */}
      
        <div className="label">
          <p>Grocery.com</p>
        </div>
        <div className="para">
          <p>India's last-minute app</p>
        </div>
        <div className="form">
          <form>
            <div className="email">
                
              <label>Email:</label>
             
              <input type="email"   placeholder="email" onChange={(e)=>{setEmail(e.target.value)}}/* value={email} onChange={(e) => setEmail(e.target.value)} */ />
            </div>
            <div  className="email">
              <label>Password:</label>
              <input
                type={pass}
                
                placeholder="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FontAwesomeIcon className="eye"
                icon={pass === "password" ? faEye : faEyeSlash}
                onClick={(e) => {
                  e.preventDefault();
                  setPass(pass === "password" ? "text" : "password");
                }}
              />
            </div>
            <div className="check_box"> 
                <input type="checkbox" className="check" /><div className="r">Remember Me</div>
            </div>
            <div className="but_login">
               <input type="submit" onClick={submit}/>
            </div>
          </form>
          
        </div>
        <div className="newuser">
            <p>New user? <Link to="/signin">Sign in</Link> </p>
        </div>
      </div>
    
      </div> 
    </>
  );
}

export default Login;

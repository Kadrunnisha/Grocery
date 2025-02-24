import React, { useState ,useEffect} from "react";
import "./profile.css";
import { useNavigate } from "react-router-dom";
import {useContext} from "react";
import {createContexts} from  "../context/context.js";
import Accountnav from "./accountnav.js";
 const Profile=()=>{
    const add=useContext(createContexts);
    const [data,setdata]=useState([]);
    const [on1,seton1]=useState(false);
    const [on2,seton2]=useState(false);
    const [on3,seton3]=useState(false);
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [phone,setphone]=useState("");
    const history=useNavigate();
    const fun1=()=>{
      seton1(!on1);
    }
    const fun2=()=>{
      seton2(!on2);
    }
    const fun3=()=>{
      seton3(!on3);
    }
    useEffect( ()=>{
      
        const fetchdata=async ()=>{
  
  
      try {
          const response = await fetch("http://localhost:8000/api/profile", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                     email:localStorage.getItem("tokken"),
                   
            }),
          });
      
          const result = await response.json();
      
          console.log(result); // This will log the result to the console
         setdata(result)
         
        } catch (error) {
          // Handle network errors or other exceptions
          console.error("Error:", error);
        }
     }
      fetchdata();
    
   },[])
   const updateemail = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/email-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data._id,
          emailn: email
        }),
      });

      if (response.ok) {
        // Update the state with the new email
      
        localStorage.setItem("tokken",email);
        setdata({ ...data, email });
      }
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      seton2(false);
    }
  };
  const updatename = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/name-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data._id,
          name: name
        }),
      });

      if (response.ok) {
        // Update the state with the new email
        setdata({ ...data, name });
      }
    } catch (error) {
      console.error("Error updating email:", error);
    } finally {
      seton1(false);
    }
  };
  const updatenumber = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/number-update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data._id,
          number: phone,
        }),
      });
  
      if (response.ok) {
        // Update the state with the new phone number
        console.log("jiiii");
        setdata({ ...data, phone });
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
    } finally {
      seton3(false);
    }
  };
  const deleteaccount= async () => {
    try {
      const response = await fetch('http://localhost:8000/api/profile-delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data._id,
          
        }),
      });
  
      if (response.ok) {
        // Update the state with the new phone number
        console.log("Account is deleted");
        localStorage.clear();
        // Redirect the user after logout
        history("/");
        window.location.reload(false); 
        alert("You account is deleted");
        
      }
    } catch (error) {
      console.error("Error in deleting number:", error);
    } 
  };
    return (
     <div className="account_box">
         <Accountnav></Accountnav>
        <div className="profile-container">
          <div className="profile_box">
            <div className="p">
              <div className="p1"><p className="pn">Personal Information</p>{on1==false?<p className="edit" onClick={fun1}>Edit</p>:<p onClick={fun1} className="edit">Cancel</p>}</div>
              <div className="p2"> {on1==true?<div><input type="input" onChange={(e)=>{setname(e.target.value)}}></input> <p onClick={updatename} className="edit">Save</p></div>:<p>{data.name}</p>}</div>
            </div>
            <div className="p">
              <div className="p1"><p className="pn">Email Address</p>{on2==false?<p className="edit" onClick={fun2}>Edit</p>:<p onClick={fun2} className="edit">Cancel</p>}</div>
              <div className="p2" > {on2==true?<div><input type="input" onChange={(e)=>{setemail(e.target.value)}}></input> <p onClick={updateemail} className="edit">Save</p></div>:<p>{data.email}</p>}</div>
            </div>
            <div className="p">
              <div className="p1"><p className="pn">Mobile Number</p>{on3==false?<p className="edit" onClick={fun3}>Edit</p>:<p onClick={fun3} className="edit">Cancel</p>}</div>
              <div className="p2"> {on3==true?<div><input type="input" onChange={(e)=>{setphone(e.target.value)}}></input> <p onClick={updatenumber} className="edit">Save</p></div>:<p>{data.phone_no}</p>}</div>
            </div>
           
          </div>
          <div className="fqs">
            <div className="fqs1"><p className="a"> FAQS</p></div>
            <div className="fqs1">
              <p className="q">What happens when I update my email address (or mobile number)?</p>
              <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related <br></br>communication on your updated email address (or mobile number).</p>
            </div>
            <div className="fqs1">
              <p className="q">When will my Grocery account be updated with the new email address (or mobile number)?</p>
              <p>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
            </div>
            <div className="fqs1">
              <p className="q">What happens to my existing Flipkart account when I update my email address (or mobile number)?</p>
              <p>Updating your email address (or mobile number) doesn't invalidate your account. Your account   remains <br></br>fully functional. You'll continue seeing your Order history, saved information and personal details.</p>
            </div>
            <div className="fqs1">
              <p className="q">Does my Seller account get affected when I update my email address?</p>
              <p>Grocery has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</p>
            </div>
          </div>
          <div className="delete">
            <p onClick={deleteaccount}>Delete Account</p>
          </div>
         
        </div>
        </div>
    )
 }
 export default Profile;
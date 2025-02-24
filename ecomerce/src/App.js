
import './App.css';
import Tittlebar from './component/navbar';
import Navbar from './component/nav';
import React, { useState,useEffect } from 'react';
import Banner from './component/banner1';
import Banner2 from './component/banner2';
import Catgeory from './component/catgeory';
import Login from './component/login';
import Signin from './component/signin';
import Slider from './component/slid';
import Product from './component/products';
import Footer from './component/footer';
import Viewall from './component/viewall';
import Profile from "./component/profile.js";
import Address from './component/address.js';
import Addaddress from './component/addaddress.js';
import { BrowserRouter,Routes,Route, useLocation, useParams } from 'react-router-dom';
import Cart from './component/cart';
import { useContext } from "react";
import {createContexts} from  "./context/context.js";
function App() {
  // const location=useLocation();
  // console.log(location.state.id);
  const mail=useContext(createContexts);
  const [data_set,setdata]=useState([]);
  useEffect(() => {
      fetch('http://localhost:8000/api/slid1')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
           
            return response.json();
        })
        .then(data => {
            // console.log(data);
            setdata(data);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
        });
    
}, []);
let arr1=data_set.filter(item => item.catgeory === 'Biscuits'&&item.price!=null);
let arr2=data_set.filter(item => item.catgeory === 'Sweet_Tooth'&&item.price!=null);
let arr4=data_set.filter(item => item.catgeory === 'Drinks'&&item.price!=null);
let arr5=data_set.filter(item => item.catgeory === 'Fruits&Vegitables'&&item.price!=null);
let arr6=data_set.filter(item => item.catgeory === 'Snacks_Munchies'&&item.price!=null);
let arr7=data_set.filter(item => item.catgeory === 'Breakfast'&&item.price!=null);
let arr8=data_set.filter(item => item.catgeory === 'Fish&meat'&&item.price!=null);
let arr3=data_set.filter(item => item.id>12);
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={
          <>
          
          <Banner></Banner>
          <Banner2></Banner2>
          <Catgeory></Catgeory>
          <Slider array={arr5}></Slider>
          <Slider array={arr2}></Slider>
          <Slider array={arr4}></Slider>
          <Slider array={arr1}></Slider>
          <Slider array={arr7}></Slider>
          <Slider array={arr6}></Slider>
          <Slider array={arr8}></Slider>
          {/* <Product></Product> */}
          </>
          
        }>
        </Route>
        
        <Route path='/login' element={<>
          
        <Login></Login></>}>

        </Route>
        <Route path='/signin' element={<>
      
        <Signin></Signin></>}>

        </Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/address" element={<Address></Address>}></Route>
        <Route path='/Product/:id' element={<><Product array={arr3}></Product></>}></Route>
        <Route path='/Product/view/:id' element={<><Viewall array={arr3}></Viewall></>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/addaddress' element={<Addaddress></Addaddress>}></Route>
        {/* <Route path='/:id' element={<><Product array={arr2}></Product></>}></Route> */}
      </Routes>
      {/* <Tittlebar></Tittlebar> */}
      <Footer></Footer>
    </div>
    </BrowserRouter>
    
  );
}

export default App;

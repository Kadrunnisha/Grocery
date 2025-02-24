import React, { useEffect, useState } from "react";
import './products.css';
import { Link } from "react-router-dom";
import {useParams }  from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown,faIndianRupeeSign,faStopwatch} from '@fortawesome/free-solid-svg-icons';
import  tea from "../image/milk.webp";
import ProductCard from "./productcard";
const Product=( props)=>{
     const {id}=useParams();
    console.log(id);
    let arr1=props.array.filter(item => item.catgeory ===`${id}`&&item.price==null);
    console.log(arr1);
    let arr=props.array.filter(item => item.catgeory ===`${id}`&&item.price!=null);
    console.log(arr);
    const [arr2,setarr2]=useState(arr);
    useEffect(()=>{
      setarr2(arr);
    },[id]);
    function shortd() {
      const sortedArr = [...arr].sort((a, b) => a.price - b.price);
      setarr2(sortedArr);
    }
  
    function shorti() {
      const sortedArr = [...arr].sort((a, b) => b.price - a.price);
      setarr2(sortedArr);
    }
  
    function shortn() {
      const sortedArr = [...arr].sort((a, b) => {
        const fa = a.name.toLowerCase();
        const fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setarr2(sortedArr);
    }
   let [on,seton]=useState(false);
   function open(){
        seton(!on);
   }
    return (
       <>
       <div className="re"></div>
       <div className=" product_nav">
          <Link to="/Product/Fruits&Vegitables" className="l"><p>Vegetables & Fruits</p></Link>
          <Link to="/Product/Breakfast" className="l"><p>Dairy & Breakfast</p></Link>
          <Link to="/Product/Snacks_Munchies" className="l"> <p>Munchies</p></Link>
          <Link to="/Product/Drinks"className="l" > <p>Coild Drinks & Juices</p></Link>
          <Link to="/Product/Snacks_Munchies" className="l"> <p> Instant & Frozen Food</p></Link>
          <Link to="/Product/Drinks" className="l"> <p>Tea & Coffe & Health Drinks</p></Link>
          <Link to="/Product/Biscuits" className="l"><p>Brakery & Biscuits</p></Link>
          <Link to="/" className="l"><p>More <FontAwesomeIcon icon={faChevronDown} /></p></Link>
       </div>
       <div className="product_container">
            <div className="catgory_container">
            {arr1.map((item, index) => (
              
              <div onClick={()=>{ const a=arr.filter(items => items.subcatgeory===`${item.name}`);
               console.log("hii");
                setarr2(a)}} className="catgory_iteam">
                <img src={`http://localhost:8000${item.image}`} className="iteam" ></img>
                <p className="na" >{item.name}</p>
               </div>
               
            ))} 
            </div>
            <div className="product_main_container">
               <div className="heading">
                <p>{id}</p>
                <div  onClick={open} className="click">
                  <div>short by  <FontAwesomeIcon icon={faChevronDown} className="ic" /></div>
                </div>
               { on==true?<>
                <div className="short" >
                    <div onClick={shortd} > Price(Low to High)</div>
                    <div onClick={shorti} >Price(High to Low)</div>
                    <div>Discount(High to Low)</div>
                    <div  onClick={shortn}>Name(A to Z)</div>
                </div>
               </>:<></>}
                
               </div>
               <div className="product_box" > 
               {arr2.map((item, index) => (
              <ProductCard item={item}/>
           
           ))} 
                     
                
               </div>
            </div>
       </div>
       </>
    )
}
export default Product;
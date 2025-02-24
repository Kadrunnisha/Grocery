
import React, { useEffect, useState } from "react";
import './products.css';
import './viewall.css';
import { Link } from "react-router-dom";
import {useParams }  from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown,faIndianRupeeSign,faStopwatch} from '@fortawesome/free-solid-svg-icons';
import ProductCard from "./productcard";
const View=(props)=>{
    const {id}=useParams();
    console.log(id);
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
          <Link to="/" className="l"><p>Vegetables & Fruits</p></Link>
          <Link to="/" className="l"><p>Dairy & Breakfast</p></Link>
          <Link to="/Product/Snacks_Munchies" className="l"> <p>Munchies</p></Link>
          <Link to="/Product/Drinks"className="l" > <p>Coild Drinks & Juices</p></Link>
          <Link to="/" className="l"> <p> Instant & Frozen Food</p></Link>
          <Link to="/" className="l"> <p>Tea & Coffe & Health Drinks</p></Link>
          <Link to="/" className="l"><p>Brakery & Biscuits</p></Link>
          <Link to="/" className="l"><p>More <FontAwesomeIcon icon={faChevronDown} /></p></Link>
       </div>
       <div className="product_container-viewall">
           
            <div className="product_main_container-viewall">
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
               <div className="product_box-viewall" > 
               {arr2.map((item, index) => (
           <ProductCard item={item}/>
           
           ))} 
               </div>
            </div>
       </div>
       </>
    )
}
export default View;
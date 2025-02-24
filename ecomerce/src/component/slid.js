import "./slid.css";
import { useState,useEffect } from "react";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown ,faStopwatch,faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'
// import { queries } from "@testing-library/react"
import { useRef } from "react"
import React from "react";
import Top from "../image/top.avif";
import { Link } from "react-router-dom";
import ProductCard from "./productcard";
const Slid=(props)=>{
 
//    console.log(props)

 
  
   const ref=useRef(null);
  
   const funs=()=>{
    let box=ref.current;
       let width=box.clientWidth;
       console.log(width);
       box.scrollLeft=box.scrollLeft-width;
       
   }
   const fu=()=>{
    let box=ref.current;
    let width=box.clientWidth;
    box.scrollLeft=box.scrollLeft+width;
   
}

if(props.array.length>0){
    return(
      
    <div className="slid_container">
       <div className="slid_inside_container">
            <button className="greaterthan" onClick={fu}><FontAwesomeIcon icon={faChevronUp} rotation={90}  className="gre"/></button>
            <button className="lessthen " onClick={funs} ><FontAwesomeIcon icon={faChevronUp} rotation={270}  className="gre"/></button>
            <div className="name"><p>{props.array[0].catgeory} </p><Link to={`/Product/view/${props.array[0].catgeory}`} className="view" onClick={()=>{window.scrollTo({ top: 0, behavior: "smooth" })}}>view all</Link></div>
          <div  ref={ref} className="slid"  >
             {props.array.map((item, index) => (
            // <div  className="element" >
            //   <a href="#">
            //     <div className="element_in">
            //     <div className="img"> <img src={item.image} className="image" /></div>
            //       <div className="timer"><FontAwesomeIcon icon={faStopwatch}  className="w"/><p>8 mins</p></div>
            //       <div className="title"><p>{item.name.substring(0,50)+"..."}</p></div>
            //        <div className="weight"><p>{item.quantity}</p></div>
            //       <div className="price_box">
            //         <div className="price"><div className="y"><FontAwesomeIcon icon={faIndianRupeeSign}  className="r"/><p>{item.price}</p></div><di className="cut_price"><FontAwesomeIcon icon={faIndianRupeeSign}  className="rc"/><p>{item.cutprice}</p></di></div>
            //         <div className="add" onClick={()=>{cartadd(item._id)}}><div className="d">Add</div></div>
            //       </div>
                 
            //     </div>
            //   </a>
            // </div>
           <ProductCard item={item}/>
           ))} 
      
         </div>
       </div>
    </div>
    )
             }
 }

 export default Slid;
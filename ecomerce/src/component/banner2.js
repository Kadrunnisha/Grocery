import  b1 from "../image/b1.avif";
import  b2 from "../image/b2.avif";
import  b3 from "../image/b3.avif";
import "./banner2.css";
import React from "react";
function banner2(){
    return(<>
     <div className="banner2_container">
        <div className="banner2_container_in" >
        <img src={b1}></img>
        <img src={b2}></img>
        <img src={b3}></img>
        </div>
        
     </div>
    </>)
}
export default banner2
import { createContext, useState } from "react";
import React from "react";
 export const createContexts=createContext(null);
 export const CartProvider=(props)=>{
    const [mail,setmail]=useState(null);
    const [add,setadd]=useState(null);
    const[num,setnum]=useState(0);
    const[t,sett]=useState(0);
    const[tcartiteam,settcartiteam]=useState(0);
    return(
        <createContexts.Provider value={{mail,setmail,add,setadd,num,setnum,t,sett,tcartiteam,settcartiteam}}>
              {props.children}
        </createContexts.Provider>
            
        
    )
 }
import React  from "react";
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass,faStore,faUser,faChevronUp,faHeart,faCartShopping, faChevronDown,faCircleUser,faBagShopping,faCreditCard,faGift} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
//  const fun=()=>{
//     if

//  }
// const s[a,b]=
function Tittlebar(){
    const [on1, setonoff]=useState(false);
    const fun=()=>{
      setonoff(!on1);
    }
    
    return(
      <div>
             <div className="statics"></div>
             <div className="header">
             <ul className="name">
                <li>
                  <lable>Flipkart.com</lable>
                </li>
            </ul> 
            <div className="searchbar">
               
            
                <ul className="searchbar2">
                    <li className="icon">
                    
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </li>
                   <li >
                      
                      <input type="text" className="input"  placeholder="Search for Products,Brands and More"></input>
                   </li> 
                </ul>
             </div>
            <div className="headerlink">
             <ul >
                <li>
                
                <a href="#">
                   <FontAwesomeIcon icon={faStore}  className="i"/>
                    <p >Become a Seller</p> </a>
                </li>
             </ul>
             <ul> 
                <li>
                    
                    <a href="#" onClick={fun}>
                      <FontAwesomeIcon icon={faUser} className="i" />

                      <p> Sign in</p>
                      {
                        on1==true?<FontAwesomeIcon icon={faChevronUp}  className="i2"/>:<FontAwesomeIcon icon={faChevronDown}  className="i2"/>
                      }
                        </a>
                    {/* <FontAwesomeIcon icon={faChevronUp} /> */}
                </li>
                <li></li>
             </ul>
             {on1==true?
             <> 
                <div className="triangle"></div>
                 <div className="Dropdown">
                 <li className="m"><p>old customer?</p><a href="#" > Login</a>
                 </li>
                 <li><a href="#" className="a"><FontAwesomeIcon icon={faCircleUser} size="xs"  className="f"/>
                 <p>My Profile</p>
                 </a></li>
                 <li>
                     <a href="#" className="a">
                     <FontAwesomeIcon icon={faBagShopping}  className="f"/>
                     <p>Orders</p>
                     </a>
                 </li>
                 <li>
                     <a href="#" className="a">
                     <FontAwesomeIcon icon={faCreditCard} size="xs"  className="f"/>
                     <p>Rewards</p>
                     </a>
                 </li>
                 <li> 
                     <a href="#"  className="a"><FontAwesomeIcon icon={faGift}  className="f"/>
                     <p>Gift</p>
                     </a>
                 </li>
              </div></>:<></>
             }
            

              <ul>
                   <li>
                      
                       <a href="#"> 
                       <FontAwesomeIcon icon={faHeart}  className="i"/>
                        
                        <p>
                        Wishlist
                        </p>
                         </a>
                   </li>
             </ul>
              <ul>
                  <li>
                    <a href="#">
                    <FontAwesomeIcon icon={faCartShopping}  className="i"/>
                    
                    <p>Cart</p>
                    </a>
                   </li>
             </ul>
           </div>      
       </div>
    </div>
   );
  }
   export default Tittlebar;    
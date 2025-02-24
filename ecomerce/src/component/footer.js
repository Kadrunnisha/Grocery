import "./footer.css";
import React from "react";
import { Link } from "react-router-dom";
import applestore from "../image/app1.webp";
import googlepay from "../image/app2.webp";
import facebook from "../image/facebook.png";
import inst from "../image/insta.png";
import tw from "../image/tw.png";
const Footer=()=>{
    return(
        <>
         <div className="footer-container">
            <div className="footer-container-top">
                <div className="footer-container-top-useful-link">
                   
                      
                <div className="head">
                        <p>Useful Links</p>
                    </div>
                    <div className="links">
                    
                       <div> <Link to="#"><p>About</p></Link></div>
                       <div><Link to="#"><p>Careers</p></Link></div>
                       <div><Link to="#"><p>Blogs</p></Link></div>
                       <div><Link to="#"><p>Blogs</p></Link></div>
                       <div><Link to="#"><p>press</p></Link></div>
                       <div><Link to="#"><p>lead</p></Link></div>
                       <div> <Link to="#"><p>Value</p></Link></div>
                       <div><Link to="#"><p>Privacy</p></Link></div>
                       <div> <Link to="#"><p>Terms</p></Link></div>
                       <div><Link to="#"><p>FAQS</p></Link></div>
                       <div><Link to="#"> <p>Security</p></Link></div>
                       <div><Link to="#"><p>Mobile</p></Link></div>
                       <div><Link to="#"><p>Contact</p></Link></div>
                       <div><Link to="#"><p>Partner</p></Link></div>
                       <div><Link to="#"><p>Express</p></Link></div>
                       <div><Link to="#"><p>Seller</p></Link></div>
                       <div><Link to="#"><p>Warehouse</p></Link></div>
                       <div><Link to="#"><p>Deliver</p></Link></div>
                    </div>
                   
                </div>
                <div className="footer-container-top-useful-link-categories">
                    <div className="head">
                        <p>Catgeories</p>
                    </div>
                    <div className="links2">
                        <div><Link to="#"><p> Vegetables & Fruits</p></Link></div>
                        <div><Link to="#"><p> Cold Drinks</p></Link></div>
                        <div><Link to="#"><p>Bakery & Biscuits </p></Link></div>
                        <div><Link to="#"><p> Dry Fruits,masala & Oil</p></Link></div>
                        <div><Link to="#"><p>Organic & Perimum</p></Link></div>
                        <div><Link to="#"><p>Pharma & Wellnes</p></Link></div>
                        <div><Link to="#"><p> Personal Care</p></Link></div>
                        <div><Link to="#"><p> Beauty & Cosmetic</p></Link></div>
                        <div><Link to="#"><p>Dry & Biscuits</p></Link></div>
                        <div><Link to="#"><p> Instant & Frozen Food</p></Link></div>
                        <div><Link to="#"><p> Sweet Tooth</p></Link></div>
                        <div><Link to="#"><p> Sauces & Spreads</p></Link></div>
                        <div><Link to="#"><p> Paan Corner</p></Link></div>
                        <div><Link to="#"><p> Cleaning Essentials</p></Link></div>
                        <div><Link to="#"><p> Ice Cream & Frozen Desserts</p></Link></div>
                        <div><Link to="#"><p> Toys & Games</p></Link></div>
                        <div><Link to="#"><p> Munchies</p></Link></div>
                        <div><Link to="#"><p> Tea, Coffee & Health Drinks</p></Link></div>
                        <div><Link to="#"><p> Atta,Rice & Dal</p></Link></div>
                        <div><Link tp="#"><p> Chicken,Meat & Fish</p></Link></div>
                        <div><Link tp="#"><p> Baby Care</p></Link></div>
                        <div><Link tp="#"><p> Home & Office</p></Link></div>
                        <div><Link tp="#"><p> Pet Care</p></Link></div>
                        <div><Link tp="#"><p> Print Store</p></Link></div>

                    </div>
                </div>
            </div>
            <div  className="footer-container-bottom">
              <div className="com">
                <p>© Grocery Commerce Private Limited (formerly known as Grofers India Private Limited), 2016-2024</p>
              </div>
              <div className="download">
                <p> Download App</p>
                <img src={applestore}></img>
                <img src={googlepay}></img>
              </div>
              <div className="social_media">
                  <a><img src={facebook}></img></a>
                  <a><img src={inst}></img></a>
                  <a><img src={tw}></img></a>
              </div>
            </div>
         </div>
        </>
    )
}
export default Footer;
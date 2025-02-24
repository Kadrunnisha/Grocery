 const express = require("express");
const {Usermodle,Slidemodel,Slidemodel2} = require("./mongodb.js");
const cors = require("cors");
const app = express();
const path=require("path");
const updateRoutesemail = require('./Routes/updateprofile');
const updatename=require('./Routes/update-name');
const updatenumber=require('./Routes/update-number');
const deleteaccount =require('./Routes/deleteaccount');
const addaddress=require('./Routes/addaddress.js');
const getaddress=require("./Routes/getaddress.js");
const cardadd=require("./Routes/cartadd.js");
const quantity=require("./Routes/quantity.js");
const removeiteam=require('./Routes/removeiteam.js');
const PORT=process.env.PORT || 8000;
app.use("/image2",express.static(path.join(__dirname,"/image2")));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api',updateRoutesemail);
app.use('/api',updatename);
app.use('/api',updatenumber);
app.use('/api',deleteaccount);
app.use('/api',addaddress);
app.use('/api',getaddress);
app.use('/api',cardadd);
app.use('/api',quantity);
app.use('/api',removeiteam);
app.get("/api/slid1", cors(),async (req, res) => {
  try {
    const slid_data = await Slidemodel2.find({});
   
    console.log(slid_data);
    // const html=`<ul>
    // ${allDbUsers.map((user)=>`<li>${user.first_name}</li>`).join("")}
    // </ul>C:\Users\HP\OneDrive\Desktop\intenship\ecomerce\backend\image\slid1\slid2
    // `C:\Users\HP\OneDrive\Desktop\intenship\ecomerce\backend\image\slid1
    return res.json(slid_data);
  } catch (error) {
    console.error("Error retrieving users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/login", cors(), async (req, res) => {
  const { email, password } = req.body;

  // console.log(req.body);

  try {
    const check = await Usermodle.findOne({ email: email });

    if (check) {
      console.log(email);
      res.json("exists");
    } else {
      res.json("notexists");
    }
  } catch (e) {
    console.error(e);
    res.json("not exit");
  }
});

app.post("/api/signin", async (req, res) => {
  const { name, phone_no, email, password } = req.body;
  const data = {
    name: name,
    phone_no: phone_no,
    email: email,
    password: password,
    cart:[]
  };

  // console.log(data);

  try {
    const check = await Usermodle.findOne({ email: email });
 
    if (check) {
      console.log(email);
      res.json("exists");
    } else {
        await Usermodle.insertMany(data);
      res.json("notexists");
    }
  } catch (e) {
    console.error(e);
    res.json("not exit");
  }
});



app.post("/api/cartfind", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Usermodle.findOne({ email }, { cart: 1 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a map of item ID to quantity
    const cartMap = new Map();
    user.cart.forEach(item => {
      cartMap.set(item.id, item.q);
    });

    // Find items in Slidemodel2 based on the IDs in the user's cart
    const slid_data = await Slidemodel2.find({ _id: { $in: Array.from(cartMap.keys()) } });

    // Add the corresponding quantity to the qu property of each item in slid_data
    slid_data.forEach(item => {
      item.qun = cartMap.get(item._id.toString());
    });

    return res.status(200).json(slid_data);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to find items in cart", error: error.message });
  }
});


app.post("/api/cartorder", async (req, res) =>{
 
      const { email }=req.body;
      console.log(email+"");
      const user = await Usermodle.findOne({ email }, { cart: 1 });
      console.log(user+"mm");
      return res.json(user);
 
});
app.post("/api/orders", async (req, res) => {
  try {
      const { orders, email } = req.body; // Extract orders and email from the request body
      console.log(orders + "nnnnn");

      // Update the user document to add orders
      const result = await Usermodle.updateOne(
          { email: email }, // Filter for the specific user document
          { $push: { orders: { $each: orders } } } // Use $push with $each to add multiple items
      );

      if (result.nModified === 1) {
          console.log("Orders added successfully");
          return res.status(200).json("Orders added successfully");
      } else {
          console.log("Failed to add orders");
          return res.status(500).json("Failed to add orders");
      }
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).json("Internal Server Error");
  }
});



app.post("/api/profile",async (req,res)=>{
  try{
    const check= await Usermodle.findOne({email:(req.body.email)},{cart:0});
    if(check){
      return res.json(check);
    }
    else {
      res.json("not added to cart");
    }
  }
  catch (e) {
    console.error(e);
    res.json("user not found");
  }
});
app.delete("/api/logout",async(req,res)=>{
  
    const email=await Usermodle.deleteOne({email:(req.body.email)});
    res.send(email);
});
app.delete("/api/deletecart",async(req,res)=>{
  const email = req.body; // The email to search for

try {
    const result = await Usermodle.updateOne(
        { email: email }, // Filter for the specific user document
        { $set: { cart: [] } } // Use $set to set the cart field to an empty array
    );

    if (result.nModified === 1) {
        console.log("Cart deleted successfully");
    } else {
        console.log("Cart not found for the specified email");
    }
} catch (error) {
    console.error("Error:", error);
}
});


app.listen(PORT, () => {
  console.log("connected");
});
app.use(express.static(path.join(__dirname,"../ecomerce/build")));


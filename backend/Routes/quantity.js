const express = require("express");
const router = express.Router();
const { Usermodle } = require("../mongodb.js");

router.post("/quantity", async (req, res) => {
  try {
    const { email, id } = req.body; // Extracting email and id from the request body

    const user = await Usermodle.findOne({ email });

    if (user) {
      // Check if the cart item with the specified id exists
      const cartItem = user.cart.find(item => item.id === id);

      if (cartItem) {
        
          return res.json(cartItem.q); // Return the actual quantity
        
      } else {
        return res.json(0); // If the cart item doesn't exist, return 0
      }
    } else {
      return res.json(0); // If the user doesn't exist, return 0
    }
  } catch (error) {
    console.error(error);
    return res.json("Failed to retrieve quantity: " + error);
  }
});

module.exports = router;

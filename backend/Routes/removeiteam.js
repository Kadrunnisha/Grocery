const express = require("express");
const router = express.Router();
const { Usermodle } = require("../mongodb.js");

router.delete("/removeiteam", async (req, res) => {
  const { email, id } = req.body; // Using query params for DELETE request

  try {
      const user = await Usermodle.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      const itemIndex = user.cart.findIndex(item => item.id === id);

      if (itemIndex === -1) {
          return res.status(404).json({ message: "Item not found in user's cart" });
      }

      user.cart.splice(itemIndex, 1); // Remove the item from the cart
      await user.save();

      return res.status(200).json({ message: "Item removed successfully" });
      
  } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});
module.exports = router;
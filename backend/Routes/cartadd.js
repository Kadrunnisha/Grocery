const express = require("express");
const router = express.Router();
const { Usermodle } = require("../mongodb.js");

router.post("/cartadd", async (req, res) => {
  try {
    const { email, id, q } = req.body;

    // Basic validation
    if (!email || !id || typeof q !== 'number' || q < 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const user = await Usermodle.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let itemIndex = user.cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
      if (q === 0) {
        // Remove the item from the cart if q is 0
        user.cart.splice(itemIndex, 1);
      } else {
        // Update the q value if q is not 0
        user.cart[itemIndex].q = q;
      }
    } else if (q > 0) {
      // If cart item with id doesn't exist and q > 0, add it to the cart
      user.cart.push({ id, q });
    }

    const updatedUser = await user.save();
    console.log(updatedUser);
    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update cart", error: error.message });
  }
});

module.exports = router;


module.exports = router;

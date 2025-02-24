const express = require("express");
const router = express.Router();
const { Usermodle } = require("../mongodb.js");

router.post("/address", async (req, res) => {
    const { email, name, number, pincode, locality, area, city, state, landmark, alternate_number } = req.body;

    // Log the incoming request data for debugging
    console.log("Request received with email:", email);

    const data = {
        Name: name,
        Phone: number,
        Pincode: pincode,
        Locality: locality,
        Area: area,
        City: city,
        State: state,
        Landmark: landmark,
        Alternate_number: alternate_number
    };

    console.log("Address data to be added:", data);

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required. Please log in first." });
        }

        // Find the user by email
        const user = await Usermodle.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Add the new address to the user's address array
        user.Address.push(data);
        await user.save();  // Save the updated user document

        res.status(200).json({ success: true, message: "Address added successfully" });

    } catch (error) {
        // Log detailed error information
        console.error("Error while adding address:", error);

        res.status(500).json({ success: false, message: "Server error occurred while adding address" });
    }
});

module.exports = router;

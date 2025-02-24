// addressRoutes.js
const express = require("express");
const router = express.Router();
const { Usermodle } = require("../mongodb.js");

// POST route to fetch addresses based on email
router.post("/addresses", async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }

        // Find the user by email
        const user = await Usermodle.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send back the addresses
        res.json({ success: true, addresses: user.Address });

    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;

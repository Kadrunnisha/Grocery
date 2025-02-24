const express = require("express");
const router = express.Router();
const { Usermodle, Slidemodel, Slidemodel2 } = require("../mongodb.js");

router.patch("/number-update", async (req, res) => {
    const { id, number } = req.body;  // Destructure `id` and `emailn` from `req.body`

    console.log(id+"hii");
    

    if (!id || !number) {
        return res.status(400).json({ message: 'User ID and new email are required.' });
    }

    try {
        const updatedUser = await Usermodle.findByIdAndUpdate(
            id,  // Use the extracted `id` from the request body
            { phone_no:number},  // Update the email field
            { new: true }  // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;  // Export the router

const express = require('express');
const router = express.Router();
const { Usermodle, Slidemodel, Slidemodel2 } = require("../mongodb.js"); // Adjust the path according to your project structure

// DELETE API to delete a user profile by ID
router.delete('/profile-delete', async (req, res) => {
  try {
    const { id } = req.body; // Extract the `id` from the request body
    console.log(id);

    // Find and delete the user by ID
    const deletedUser = await Usermodle.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User profile deleted successfully', deletedUser });
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

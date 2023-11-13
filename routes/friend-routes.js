const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Custom error-handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Add Friends
router.post('/api/users/add-friend', async (req, res) => {
  try {
    const { requesterUsername, friendUsername } = req.body;

    // Find the user with the requester's username
    const requesterUser = await User.findOne({ username: requesterUsername });

    if (!requesterUser) {
      return res.status(404).json({ message: `User ${requesterUsername} not found` });
    }

    // Find the user with the friend's username and update their friends array
    const friendUser = await User.findOneAndUpdate(
      { username: friendUsername },
      { $push: { friends: requesterUser._id } },
      { new: true } // Return the updated user
    );

    if (!friendUser) {
      return res.status(404).json({ message: `User ${friendUsername} not found` });
    }

    res.json(friendUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;





const express = require('express');
const router = express.Router();
const utils = require("../auth/utils");

// Import User model
const { User } = require("../models/User");
// Import InvalidToken model (created after a user logs out)
const { InvalidToken } = require("../models/User");


// Get specific user
router.get('/user', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Log out user
router.get('/logout', async(req, res) => {
  try {
    // After the user logs out, their token will be left in the system
    // So it should be marked as invalid until it expires (1 day max)
    const token = new InvalidToken({ value: utils.extractToken(req) });
    await token.save();

    req.logout();
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

// Get all invalid tokens
router.get('/tokens', async(req, res) => {
  try {
    const tokens = await InvalidToken.find({});
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Update specific user
router.patch('/edit-user', async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.user._id }, { $set: req.body }, { runValidators: true });

    res.json({
      result: updatedUser,
      message: 'Updated user successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific user
router.delete('/delete-user', async (req, res) => {
  try {
    // Delete user from db
    const removedUser = await User.deleteOne({ _id: req.user._id });

    // Mark user's auth token as invalid
    const token = new InvalidToken({ value: utils.extractToken(req) });
    await token.save();
    // Log out user
    req.logout();

    res.json({
      result: removedUser,
      message: 'Deleted user successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

module.exports = router;
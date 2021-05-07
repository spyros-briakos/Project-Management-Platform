const express = require('express');
const router = express.Router();
const utils = require("../auth/utils");
const verify = require("../auth/verify_email");
const jwt = require('jsonwebtoken');

// Import User model
const { User } = require("../models/User");
// Import InvalidToken model (created after a user logs out)
const { InvalidToken } = require("../models/User");


// Get specific user
router.get('/user', async (req, res) => {
  try {
    // Find user in db
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
    res.json({ message: error });
  }
});

// // Get all invalid tokens
// router.get('/tokens', async(req, res) => {
//   try {
//     const tokens = await InvalidToken.find({});
//     res.json(tokens);
//   } catch (error) {
//     res.status(400).json({ message: error });
//   }
// });

// Update specific user
router.patch('/edit-user', async (req, res) => {
  try {
    // If a new email was given by the user
    if(req.body.email) {
      // Create a verification code for the user (will be deleted after the new email address is verified)
      const verificationCode = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

      // The account will be pending until the new email is verified
      req.body['status'] = 'Pending';
      req.body['verificationCode'] = verificationCode;

      // Update user
      const updatedUser = await User.updateOne({ _id: req.user._id }, { $set: req.body }, { runValidators: true });
      const user = await User.find({ _id: req.user._id });

      // Send verification to the user's email
      verify.sendVerificationEmail(req.user.username, req.body.email, verificationCode);

      // Log out the user until the new email is verified
      const token = new InvalidToken({ value: utils.extractToken(req) });
      await token.save();
      req.logout();

      res.json({
        message: 'Updated user successfully.\nWe sent you a verification email. Please check your Gmail!',
        user: user
      });
    }
    else {
      // Update user
      const updatedUser = await User.updateOne({ _id: req.user._id }, { $set: req.body }, { runValidators: true });
      const user = await User.find({ _id: req.user._id });

      res.json({
        message: 'Updated user successfully.',
        user: user
      });
    }
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

    res.json({ message: 'Deleted user successfully.' });
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

module.exports = router;
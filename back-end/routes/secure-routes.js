const express = require('express');
const router = express.Router();
const utils = require("../auth/utils");

// Import InvalidToken model (created after a user logs out)
const { InvalidToken } = require("../models/User");


router.get('/profile', (req, res) => {
  res.json({
    message: 'You made it to the secure route',
  })
});

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

router.get('/tokens', async(req, res) => {
  try {
    const tokens = await InvalidToken.find({});
    res.json(tokens);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

module.exports = router;
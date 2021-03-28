'use strict'

const express = require("express");
const router = express.Router();

// Import User model
const User = require("../models/User");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Create user
router.post("/", async (req, res) => {
  try {
    console.log("USER START")
    const user = new User(req.body);
    console.log("USER PASSED")
    const savedUser = await user.save();
    console.log("USER SAVED")
    res.json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get specific user
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific user
router.delete('/:userId', async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userId });
    res.json(removedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific user
router.patch('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.params.userId }, { $set: req.body });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;
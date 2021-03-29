'use strict'

const express = require("express");
const router = express.Router();

// Import UserStory model
const UserStory = require("../models/UserStory");

// Get all user stories
router.get("/", async (req, res) => {
  try {
    const userStories = await UserStory.find({});
    res.json(userStories);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Create user story
router.post("/", async (req, res) => {
  try {
    const userStory = new UserStory(req.body);
    const savedUserStory = await userStory.save();
    res.json(savedUserStory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get specific user story
router.get('/:userStoryId', async (req, res) => {
  try {
    const userStory = await UserStory.findById(req.params.userStoryId);
    res.json(userStory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific user story
router.delete('/:userStoryId', async (req, res) => {
  try {
    const removedUserStory = await UserStory.remove({ _id: req.params.userStoryId });
    res.json(removedUserStory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific user story
router.patch('/:userStoryId', async (req, res) => {
  try {
    const updatedUserStory = await UserStory.updateOne({ _id: req.params.userStoryId }, { $set: req.body });
    res.json(updatedUserStory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})
// Export router
module.exports = router;
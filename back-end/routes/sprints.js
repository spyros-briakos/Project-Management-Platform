'use strict'

const express = require("express");
const router = express.Router();

// Import Sprint model
const Sprint = require("../models/Sprint");

// Get all sprints
router.get("/", async (req, res) => {
  try {
    const sprints = await Sprint.find({});
    res.json(sprints);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Create sprint
router.post("/", async (req, res) => {
  try {
    const sprint = new Sprint(req.body);
    const savedSprint = await sprint.save();
    res.json(savedSprint);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get specific sprint
router.get('/:sprintId', async (req, res) => {
  try {
    const sprint = await Sprint.findById(req.params.sprintId);
    res.json(sprint);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific sprint
router.delete('/:sprintId', async (req, res) => {
  try {
    const removedSprint = await Sprint.remove({ _id: req.params.sprintId });
    res.json(removedSprint);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific sprint
router.patch('/:sprintId', async (req, res) => {
  try {
    const updatedSprint = await Sprint.updateOne({ _id: req.params.sprintId }, { $set: req.body });
    res.json(updatedSprint);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;
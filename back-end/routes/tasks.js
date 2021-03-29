'use strict'

const express = require("express");
const router = express.Router();

// Import Task model
const Task = require("../models/Task");

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Create task
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get specific task
router.get('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific task
router.delete('/:taskId', async (req, res) => {
  try {
    const removedTask = await Task.remove({ _id: req.params.taskId });
    res.json(removeTask);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific task
router.patch('/:taskId', async (req, res) => {
  try {
    const updatedTask = await Task.updateOne({ _id: req.params.taskId }, { $set: req.body });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;
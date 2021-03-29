'use strict'

const express = require("express");
const router = express.Router();

// Import Project model
const Project = require("../models/Project");

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Create project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get specific project
router.get('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Delete specific project
router.delete('/:projectId', async (req, res) => {
  try {
    const removedProject = await Project.remove({ _id: req.params.projectId });
    res.json(removedProject);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific project
router.patch('/:projectId', async (req, res) => {
  try {
    const updatedProject = await Project.updateOne({ _id: req.params.projectId }, { $set: req.body });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;
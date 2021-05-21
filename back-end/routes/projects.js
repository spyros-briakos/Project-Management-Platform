'use strict'

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const moment = require("moment");
const { updateOne, findById } = require("../models/Project");

// Import Project model
const Project = require("../models/Project");
const { User } = require("../models/User");

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
    const token = req.headers.authorization.split(' ')[1]
    var decoded = jwt.verify(token, process.env.JWT_SECRET);
    var userId = decoded.sub;
    console.log(userId)
    const user = await User.findById(userId, ()=>{});
    // console.log(user)
    const project = new Project(req.body);
    project.productOwner = userId;
    project.scrumMaster = userId;
    project.members = [userId];
    project.plan_in_use = req.body.plan_in_use == 'premium' && user.plan_in_use == 'premium' ? req.body.plan_in_use : 'standard';
    const savedProject = await project.save();

    // Add new project to user's projects
    const projects = user.projects;
    projects.push(savedProject._id);
    await User.updateOne({ _id: user._id }, { $set: { projects: projects } }, { runValidators: true });

    res.json(savedProject);
  } catch (error) {
    console.log(error)
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
    // Find project in the db
    const project = await Project.findById(req.params.projectId);

    // If no such project in the db
    if(!project) {
      return res.status(400).json({ message: 'Δεν βρέθηκε τέτοιο project.' });
    }

    // First remove project from all members
    for (let userId of project.members) {
      try {
        // Get current user-member
        const user = await User.findById(userId);

        // If no such user in the db
        if(!user) {
          return res.status(400).json({ message: 'Δεν βρέθηκε τέτοιος χρήστης.' });
        }

        const projects = user.projects;
        // Get project's position in the list of user's projects
        const index = projects.findIndex((projectId) => { return projectId === req.params.projectId });
        // At position index, remove 1 item
        projects.splice(index, 1);

        // Update user's info
        await User.updateOne({ _id: user._id }, { $set: { projects: projects } }, { runValidators: true });

      } catch (err) {
        return res.status(400).json({ message: err });
      }
    }

    const removedProject = await Project.deleteOne({ _id: req.params.projectId });
    res.json(removedProject);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Update specific project
router.patch('/:projectId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (req.body.status == 'done' && req.body.status != project.status) {
      req.body.endingDate = Date.now();
    }
    if (req.body.plan_in_use && req.body.plan_in_use != project.plan_in_use) {
      const token = req.headers.authorization.split(' ')[1]
      console.log(token)
      var decoded = jwt.verify(token, 'TOP_SECRET');
      var userId = decoded.sub;
      const user = await User.findById(userId);
      project.plan_in_use = req.body.plan_in_use == 'premium' && user.plan_in_use == 'premium' ? req.body.plan_in_use : 'standard';
      if (req.body.plan_in_use == 'premium' && user.plan_in_use != 'premium') {
        return res.status(400).json({ message: "Can\'t update project to premium, if you have not unlocked the premium plan." });
      }
    }
    const updatedProject = await Project.updateOne({ _id: req.params.projectId }, { $set: req.body });
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;
'use strict'

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const moment = require("moment");
const serializers = require("../serializers");

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

// Get all projects
router.post("/get-sprints", async (req, res) => {
  try {
    // const user = req.user;
    // const projectName = req.project;
    const project = await Project.find({name: req.body.project});
    
    res.json(project.sprints);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Create project
router.post("/", async (req, res) => {
  try {
    const user = req.user;
    // console.log(user)
    const project = new Project(req.body);
    project.productOwner = user._id;
    project.scrumMaster = user._id;
    project.members = [user._id];
    project.plan_in_use = req.body.plan_in_use == 'premium' && user.plan_in_use == 'premium' ? req.body.plan_in_use : 'standard';
    const savedProject = await project.save();

    // Get serialiazed project
    const result = serializers.serializeProject(projectObject=project);

    // If there was an error
    if(result.error) {
      return res.status(400).json({ message: result.error });
    }

    // Add new project to user's projects
    const projects = user.projects;
    projects.push(savedProject._id);
    await User.updateOne({ _id: user._id }, { $set: { projects: projects } }, { runValidators: true });

    res.json(result.project);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error });
  }
})

// Get specific project
router.get('/:projectId', async (req, res) => {
  try {
    // Get serialiazed project
    const result = serializers.serializeProject(id=req.params.projectId);

    // If there was an error
    if(result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json(result.project);
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

    // Check if is the product owner is the user that sends the request
    if (req.user._id === project.productOwner){
      return res.status(400).json({ message: 'Δεν βρέθηκε τέτοιος χρήστης.' });
    }

    // Remove project from user's projects list
    req.user.projects = user.projects.filter((pID) => { return pID !== req.params.projectId });

    // Update user's info
    await User.updateOne({ _id: user._id }, { $set: { projects: req.user.projects } }, { runValidators: true });

    // Remobe project from its table
    const removedProject = await Project.deleteOne({ _id: req.params.projectId });

    res.json(removedProject);
  } catch (err) {
    return res.status(400).json({ message: err });
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
      const user = await User.findById(req.user._id);
      project.plan_in_use = req.body.plan_in_use == 'premium' && user.plan_in_use == 'premium' ? req.body.plan_in_use : 'standard';
      if (req.body.plan_in_use == 'premium' && user.plan_in_use != 'premium') {
        return res.status(400).json({ message: "Can\'t update project to premium, if you have not unlocked the premium plan." });
      }
    }
    const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { runValidators: true, new: true });

    // Get serialiazed project
    const result = serializers.serializeProject(projectObject=updatedProject);

    // If there was an error
    if(result.error) {
      return res.status(400).json({ message: result.error });
    }

    res.json(result.project);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// !Choose project

// !Invite to project
// !accept invite
// !Get userstories
// !Get sprints
// !Get tasks
// !Create userstories
// !Create sprint
// !Create task
// !Edit userstories
// !Edit sprint
// !Edit task
// !delete userstories
// !delete sprint
// !delete task
// !join task
// !join task


// Export router
module.exports = router;
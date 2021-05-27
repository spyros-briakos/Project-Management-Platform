'use strict'

const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();
const moment = require("moment");
const serializers = require("../serializers");

// Import Project model
const Project = require("../models/Project");
const { User } = require("../models/User");
const { projectDetailsSerializer } = require("../serializers/projects");
const UserStory = require("../models/UserStory");

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    context = []
    for (let i in projects) {
      context.push(projectDescriptionSerializer(projects[i]))
    }

    res.json(context);
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
    for (let i in project.sprints) {
      let members = []
      for (let j in project.sprints[i].members) {
        members.push(project.sprints[i].members[j].username)
      }
      project.sprints[i].members = members
    }
    
    res.json(project.sprints);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get all projects
router.post("/get-userstories", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    
    res.json(project.userStories);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get all projects
router.post("/get-details", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    context = projectDetailsSerializer(project)

    res.json(context);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// ADD USERSTORY/ SPRINT/ TASK

router.post("/add-userstory", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    const user = req.user;
    if (project.productOwner !== user._id) throw 'Unauthorized action'

    const userStory = new UserStory(req.body.userStory);
    userStory.tasks = []
    userStory.sprints = []
    const savedUserStory = await userStory.save();
    project.userStories.push(savedUserStory._id)

    res.json(savedUserStory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/add-sprint", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    const user = req.user;
    if (project.productOwner !== user._id) throw 'Unauthorized action'

    const sprint = new Sprint(req.body.sprint);
    const savedSprint = await sprint.save();
    project.sprints.push(savedSprint._id)

    res.json(savedSprint);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/add-task", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    const user = req.user;
    if (!project.members.includes(user._id)) throw 'Unauthorized action'

    const userStory = await UserStory.find({name: req.body.userStory});

    const task = new Task(req.body.task);
    const savedTask = await task.save();
    if (savedTask.sprint) {
      const sprint = await Sprint.findById(savedTask.sprint);
      sprint.tasks.push(savedTask._id)
    }
    userStory.tasks.push(savedTask._id)

    res.json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// EDIT USERSTORY/ SPRINT/ TASK

router.post("/edit-userstory", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    const user = req.user;
    const userStory = await UserStory.findById(req.body.userStory.id);
    if (!project.userStories.includes(userStory._id) && project.productOwner !== user._id) throw 'Unauthorized action'
    
    if (req.body.userStory.status == 'done' && req.body.userStory.status != userStory.status) {
      req.body.userStory.endingDate = Date.now();
    }
    const updatedUserStory = await UserStory.findByIdAndUpdate(req.body.userStory.id, req.body.userStory, { runValidators: true, new: true });

    res.json(updatedUserStory);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/edit-sprint", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    const user = req.user;
    const sprint = await Sprint.findById(req.body.sprint.id);
    if (!project.userStories.includes(sprint._id) && project.productOwner !== user._id) throw 'Unauthorized action'
    
    if (req.body.sprint.status == 'done' && req.body.sprint.status != sprint.status) {
      req.body.sprint.endingDate = Date.now();
    }
    const updatedSprint = await Sprint.findByIdAndUpdate(req.body.sprint.id, req.body.sprint, { runValidators: true, new: true });

    res.json(updatedSprint);
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/edit-task", async (req, res) => {
  try {
    const project = await Project.find({name: req.body.project});
    const user = req.user;
    const task = await Task.findById(req.body.task.id);
    if (!project.userStories.includes(task._id) && project.productOwner !== user._id) throw 'Unauthorized action'
    
    if (req.body.task.status == 'done' && req.body.task.status != task.status) {
      req.body.task.endingDate = Date.now();
    }
    const updatedTask = await Task.findByIdAndUpdate(req.body.task.id, req.body.task, { runValidators: true, new: true });

    res.json(updatedTask);
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
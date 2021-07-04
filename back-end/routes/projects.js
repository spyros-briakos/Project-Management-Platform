'use strict'

const express = require("express");
const router = express.Router();

// Import Project model
const serializer = require("../serializers/projects");
const { User } = require("../models/User");
const Project = require("../models/Project");
const Sprint = require("../models/Sprint");
const UserStory = require("../models/UserStory");
const Task = require("../models/Task");

// GETTERS

// Get all projects
router.post("/get-projects", async (req, res) => {
  try {
    const user = req.user;
    const projects = user.projects;
    const context = []
    for (let i in projects) {
      context.push(await serializer.projectDescriptionSerializer(projects[i]))
    }

    res.json({status: 'OK', projects: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get all sprints
router.post("/get-sprints", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!project.members.includes(user._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const context = []
    for (let i in project.sprints) {
      context.push(await serializer.sprintSerializer(project.sprints[i]));
    }
    res.json({status: 'OK', sprints: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get all user stories
router.post("/get-userstories", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!project.members.includes(user._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const context = []
    for (let i in project.userStories) {
      context.push(await serializer.userStorySerializer(project.userStories[i]));
    }
    res.json({status: 'OK', userStories: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Get details of project
router.post("/get-details", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!project.members.includes(user._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const context = await serializer.projectDetailsSerializer(project);
    res.json({status: 'OK', project: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// ADD PROJECT/ USERSTORY/ SPRINT/ TASK

router.post("/add-project", async (req, res) => {
  try {
    const user = req.user;
    const project = new Project(req.body.project);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    project.productOwner = user._id;
    project.scrumMaster = user._id;
    project.members = [user._id];
    project.sprints = [];
    project.userStories = [];
    project.plan_in_use = req.body.plan_in_use == 'premium' && user.plan_in_use == 'premium' ? req.body.plan_in_use : 'standard';
    const savedProject = await project.save();
    
    // Add new project to user's projects
    user.projects.push(savedProject._id);
    await User.findByIdAndUpdate(user._id, user, { runValidators: true });
    
    const context = await serializer.projectDetailsSerializer(savedProject);
    res.json({status: 'OK', message: 'Το Project δημιουργήθηκε με επιτυχία.', project: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/add-userstory", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const userStory = new UserStory(req.body.userStory);
    userStory.tasks = []
    userStory.sprints = []
    const savedUserStory = await userStory.save();

    // Update project
    project.userStories.push(savedUserStory._id);
    await Project.findByIdAndUpdate(project._id, project, { runValidators: true });

    const context = await serializer.userStorySerializer(savedUserStory);
    res.json({status: 'OK', message: 'Το UserStory δημιουργήθηκε με επιτυχία.', userStory: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/add-sprint", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const sprint = new Sprint(req.body.sprint);
    sprint.tasks = []
    const savedSprint = await sprint.save();

    // Update project
    project.sprints.push(savedSprint._id);
    await Project.findByIdAndUpdate(project._id, project, { runValidators: true });

    const context = await serializer.sprintSerializer(savedSprint);
    res.json({status: 'OK', message: 'Το Sprint δημιουργήθηκε με επιτυχία.', sprint: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/add-task", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!project.members.includes(user._id) && !user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const userStory = await UserStory.findById(req.body.task.userStory);
    // If no such userStory found
    if(!userStory) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το user story.' });
    }

    const task = new Task(req.body.task);
    var sprint = null;
    if (task.sprint) {
      sprint = await Sprint.findById(req.body.task.sprint);
      // If no such sprint found
      if(!sprint) {
        return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
      }
    }
    // task.members = [user._id];
    task.beforeTasks = [];
    task.afterTasks = [];
    task.members = [user._id];
    const savedTask = await task.save();
    if (sprint) {
      sprint.tasks.push(savedTask._id)
      await Sprint.findByIdAndUpdate(sprint._id, sprint, { runValidators: true });
    }
    userStory.tasks.push(savedTask._id)
    await UserStory.findByIdAndUpdate(userStory._id, userStory, { runValidators: true });

    const context = await serializer.taskSerializer(savedTask);
    res.json({status: 'OK', message: 'Το Task δημιουργήθηκε με επιτυχία.', task: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// EDIT PROJECT/ USERSTORY/ SPRINT/ TASK

router.post('/edit-project', async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if is the product owner is the user that sends the request
    if (!user._id.equals(project.productOwner._id)){
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    if (req.body.status == 'done' && req.body.status != project.status) {
      req.body.endingDate = Date.now();
    }
    if (req.body.plan_in_use && req.body.plan_in_use != project.plan_in_use) {
      project.plan_in_use = req.body.plan_in_use == 'premium' && user.plan_in_use == 'premium' ? req.body.plan_in_use : 'standard';
      if (req.body.plan_in_use == 'premium' && user.plan_in_use != 'premium') {
        return res.status(400).json({ message: "Σφάλμα: Το project δεν μπορεί να αναβαθμιστεί σε premium αν ο ιδιοκτήτης δεν έχει τα αντίστοιχα δικαιώματα." });
      }
    }
    if (req.body.scrumMaster && !req.body.scrumMaster.equals(project.scrumMaster)) {
      const scrumMaster = await User.findById(req.body.scrumMaster);
      // If no such project found
      if(!scrumMaster) {
        return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε ο νέος scrum master.' });
      }
      if (!project.members.includes(req.body.scrumMaster)) {
        return res.status(400).json({ message: 'Σφάλμα: Ο νέος scrum master δεν είναι μέλος της ομάδας.' });
      }
    }
    if (req.body.productOwner && !req.body.productOwner.equals(project.productOwner)) {
      const productOwner = await User.findById(req.body.productOwner);
      // If no such project found
      if(!productOwner) {
        return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε ο νέος product owner.' });
      }
      if (!project.members.includes(req.body.productOwner)) {
        return res.status(400).json({ message: 'Σφάλμα: Ο νέος product owner δεν είναι μέλος της ομάδας.' });
      }
    }
    delete req.body.sprints;
    delete req.body.userStories;
    const updatedProject = await Project.findByIdAndUpdate(project._id, req.body.project, { runValidators: true });

    const context = await serializer.projectDetailsSerializer(updatedProject);
    res.json({status: 'OK', message: 'Το Project τροποποιήθηκε με επιτυχία.', project: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/edit-userstory", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const userStory = await UserStory.findById(req.body.userStory._id);
    // If no such project found
    if(!userStory || !project.userStories.includes(userStory._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το user story.' });
    }    
    if (req.body.userStory.status == 'done' && req.body.userStory.status != userStory.status) {
      req.body.userStory.endingDate = Date.now();
    }
    delete req.body.userStory.tasks
    delete req.body.userStory.sprints
    const updatedUserStory = await UserStory.findByIdAndUpdate(req.body.userStory._id, req.body.userStory, { runValidators: true });

    const context = await serializer.userStorySerializer(updatedUserStory);
    res.json({status: 'OK', message: 'Το UserStory τροποποιήθηκε με επιτυχία.', userStory: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/edit-sprint", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const sprint = await Sprint.findById(req.body.sprint._id);
    // If no such sprint found
    if(!sprint || !project.sprints.includes(req.body.sprint._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }    
    if (req.body.sprint.status == 'done' && req.body.sprint.status != sprint.status) {
      req.body.sprint.endingDate = Date.now();
    }
    delete req.body.sprint.tasks
    const updatedSprint = await Sprint.findByIdAndUpdate(req.body.sprint._id, req.body.sprint, { runValidators: true });

    const context = await serializer.sprintSerializer(updatedSprint);
    res.json({status: 'OK', message: 'Το Sprint τροποποιήθηκε με επιτυχία.', sprint: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/edit-task", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    const task = await Task.findById(req.body.task._id);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!task.members.includes(user._id) && !user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    // If no such task found
    if(!task || !project.userStories.includes(task.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το task.' });
    }
    
    // if (req.body.task.status == 'done' && !req.body.task.status.equals(task.status)) {
    //   req.body.task.endingDate = Date.now();
    // }

    if (req.body.sprint && !req.body.sprint.equals(task.sprint)) {
      const sprint = await Sprint.findById(req.body.sprint);
      // If no such userStory found
      if(!sprint) {
        return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
      }
    }
    if (req.body.userStory && !req.body.userStory.equals(task.userStory)) {
      const userStory = await UserStory.findById(req.body.userStory);
      // If no such userStory found
      if(!userStory) {
        return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το userStory.' });
      }
    }
    delete req.body.task.sprint;
    delete req.body.task.userStory;
    delete req.body.task.members;
    delete req.body.task.beforeTasks;
    delete req.body.task.afterTasks;
    const updatedTask = await Task.findByIdAndUpdate(req.body.task._id, req.body.task, { runValidators: true });

    const context = await serializer.taskSerializer(updatedTask);
    res.json({status: 'OK', message: 'Το Task τροποποιήθηκε με επιτυχία.', task: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// DELETE PROJECT/ USERSTORY/ SPRINT/ TASK

router.post('/delete-project', async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if it is not the product owner that sends the request
    if (!user._id.equals(project.productOwner._id)){
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    // Remove project from all members' projects lists
    for (let memberObj of project.members) {
      const member = await User.findById(memberObj._id);
      member.projects = member.projects.filter((pID) => { return !pID.equals(project._id) });

      // Update member's info
      await User.findByIdAndUpdate(member._id, { projects: member.projects }, { runValidators: true });
    }

    for (let i in project.sprints) {
      await Sprint.deleteOne({ _id: project.sprints[i] });
    }
    for (let i in project.userStories) {
      const userStory = await UserStory.findById(project.userStories[i]);
      for (let j in project.tasks) {
        await Task.deleteOne({ _id: userStory.tasks[j] });
      }
      await UserStory.deleteOne({ _id: userStory._id });
    }
    // Remove project from its table
    await Project.deleteOne({ _id: project._id });

    res.json({ status: 'OK', message: 'Το Project διαγράφθηκε με επιτυχία.' });
  } catch (err) {
    return res.status(400).json({ message: err });
  }

})

router.post("/delete-userstory", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const userStory = await UserStory.findById(req.body.userStoryID);
    // If no such userStory found
    if(!userStory || !project.userStories.includes(req.body.userStoryID)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το user story.' });
    }
    let task, sprint
    for (let i in userStory.tasks) {
      task = await Task.findById(userStory.tasks[i]);
      if (task.sprint) {
        sprint = await Sprint.findById(task.sprint);
        sprint.tasks = sprint.tasks.filter((tID) => { return !tID.equals(task._id) });
        await Sprint.findByIdAndUpdate(sprint._id, sprint, { runValidators: true });
      }
      await Task.deleteOne({ _id: task._id });
    }
    project.userStories = project.userStories.filter((usID) => { return !usID.equals(userStory._id) });
    await Project.findByIdAndUpdate(project._id, project, { runValidators: true });
    await UserStory.deleteOne({ _id: userStory._id });
    
    const context = await serializer.projectDetailsSerializer(project);
    res.json({status: 'OK', message: 'Το UserStory διαγράφθηκε με επιτυχία.', project: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/delete-sprint", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    const sprint = await Sprint.findById(req.body.sprintID);
    // If no such sprint found
    if (!sprint || !project.sprints.includes(req.body.sprintID)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    let userStory
    for (let i in project.userStories) {
      userStory = await UserStory.findById(project.userStories[i]);
      userStory.sprints = userStory.sprints.filter((sID) => { return !sID.equals(sprint._id) });
      await UserStory.findByIdAndUpdate(userStory._id, userStory, { runValidators: true });
    }
    let task
    for (let i in sprint.tasks) {
      task = await Task.findById(sprint.tasks[i]);
      task.sprint = null
      await Task.findByIdAndUpdate(task._id, task, { runValidators: true });
    }
    project.sprints = project.sprints.filter((sID) => { return !sID.equals(sprint._id) });
    await Project.findByIdAndUpdate(project._id, project, { runValidators: true });
    await Task.deleteOne({ _id: sprint._id });
    
    const context = await serializer.projectDetailsSerializer(project);
    res.json({status: 'OK', message: 'Το Sprint διαγράφθηκε με επιτυχία.', project: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/delete-task", async (req, res) => {
  try {
    const user = req.user;
    const project = await Project.findById(req.body.projectID);
    const task = await Task.findById(req.body.taskID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    if (!task.members.includes(user._id) && !user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    // If no such task found
    if(!task || !project.userStories.includes(task.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το task.' });
    }
    if (task.sprint) {
      const sprint = await Sprint.findById(task.sprint);
      // Remove task from user's tasks list
      sprint.tasks = sprint.tasks.filter((tID) => { return !tID.equals(task._id) });

      // Update user's info
      await Sprint.findByIdAndUpdate(sprint._id, sprint, { runValidators: true });
    }
    if (task.userStory) {
      const userStory = await UserStory.findById(task.userStory);
      // Remove task from user's tasks list
      userStory.tasks = userStory.tasks.filter((tID) => { return !tID.equals(task._id) });

      // Update user's info
      await UserStory.findByIdAndUpdate(userStory._id, userStory, { runValidators: true });
    }

    let linkedTask
    for (let i in task.beforeTasks) {
      linkedTask = await Task.findById(task.beforeTasks[i]);
      linkedTask.afterTasks = linkedTask.afterTasks.filter((tID) => { return !tID.equals(task._id) })
      await Task.findByIdAndUpdate(linkedTask._id, linkedTask, { runValidators: true });
    }
    for (let i in task.afterTasks) {
      linkedTask = await Task.findById(task.afterTasks[i]);
      linkedTask.beforeTasks = linkedTask.beforeTasks.filter((tID) => { return !tID.equals(task._id) })
      await Task.findByIdAndUpdate(linkedTask._id, linkedTask, { runValidators: true });
    }
    await Task.deleteOne({ _id: task._id });

    const context = await serializer.projectDetailsSerializer(project);
    res.json({status: 'OK', message: 'Το Task διαγράφθηκε με επιτυχία.', project: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/join-task", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    const task = await Task.findById(req.body.taskID);
    // If no such task found
    if(!task || !project.userStories.includes(task.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το task.' });
    }
    // Check if user is authorized for that action
    const user = req.user;
    if (!project.members.includes(user._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    // If the user is already a member of the task
    if (task.members.includes(user._id)) {
      res.status(400).json({ message: `Είσαι ήδη μέλος του Task ${task.name}.` });
    }

    task.members.push(user._id)
    const updatedTask = await Task.findByIdAndUpdate(task._id, task, { runValidators: true });

    const context = await serializer.taskSerializer(updatedTask);
    res.json({status: 'OK', message: 'Ο χρήστης έγινε μέλος του Task.', task: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/leave-task", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    const task = await Task.findById(req.body.taskID);
    // If no such task found
    if(!task || !project.userStories.includes(task.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το task.' });
    }
    // Check if user is authorized for that action
    const user = req.user;
    if (!project.members.includes(user._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    if (task.members.includes(user._id)) {
      task.members = task.members.filter((mID) => { return !mID.equals(user._id) });
    }
    const updatedTask = await Task.findByIdAndUpdate(task._id, task, { runValidators: true });

    const context = await serializer.taskSerializer(updatedTask);
    res.json({status: 'OK', message: 'Ο χρήστης αποχώρησε από το Task.', task: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/leave-project", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // Check if user is authorized for that action
    const user = req.user;
    if (project.productOwner.equals(user._id)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }

    if (project.members.includes(user._id)) {
      project.members = project.members.filter((mID) => { return !mID.equals(user._id) });

      if (project.scrumMaster.equals(user._id)) {
        project.scrumMaster = project.productOwner
      }
    }
    let userStory, task
    for (let i in project.userStories) {
      userStory = await UserStory.findById(project.userStories[i]);
      for (let j in userStory.tasks) {
        task = Task.findById(userStory.tasks[j]);
        task.members = task.members.filter((mID) => { return !mID.equals(user._id) });
        await Task.findByIdAndUpdate(task._id, task, { runValidators: true });
      }
    }

    const updatedProject = await Project.findByIdAndUpdate(project._id, project, { runValidators: true });

    user.projects = user.projects.filter((pID) => { return !pID.equals(project._id) });
    await User.findByIdAndUpdate(user._id, user, { runValidators: true });

    const context = await serializer.projectDetailsSerializer(updatedProject);
    res.json({status: 'OK', message: 'Ο χρήστης αποχώρησε από το Project.', project: context});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/connect-task-sprint", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    // If no such sprint found
    if(!project.sprints.includes(req.body.sprintID)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    const sprint = await Sprint.findById(req.body.sprintID);
    const task = await Task.findById(req.body.taskID);
    // If no such task found
    if(!task || !project.userStories.includes(task.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    // Check if user is authorized for that action
    const user = req.user;
    if (!task.members.includes(user._id) && !user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }
    const userStory = await UserStory.findById(task.userStory);
    
    if (task.sprint && !task.sprint.equals(sprint._id)) {
      const taskSprint = await Sprint.findById(task.sprint);
      taskSprint.tasks = taskSprint.tasks.filter((tID) => { return !tID.equals(task._id) })
      await Sprint.findByIdAndUpdate(taskSprint._id, taskSprint, { runValidators: true });
      let userStoryTask
      let flag = false
      for (let i in userStory.tasks) {
        userStoryTask = await Task.findById(userStory.tasks[i]._id);
        if (userStoryTask.sprint.equals(task.sprint)) {
          flag = true
          break
        }
      }
      if (!flag) {
        userStory.sprints = userStory.sprints.filter((sID) => { return !sID.equals(task.sprint) })
      }
    } else if (task.sprint) {
      return res.status(400).json({ message: 'Σφάλμα: Το task είναι ήδη συνδεδεμένο με το sprint.' });
    }

    task.sprint = sprint._id
    sprint.tasks.push(task._id)
    if (!userStory.sprints.includes(sprint._id)) {
      userStory.sprints.push(sprint._id)
    }

    await Task.findByIdAndUpdate(task._id, task, { runValidators: true });
    await Sprint.findByIdAndUpdate(sprint._id, sprint, { runValidators: true });
    await UserStory.findByIdAndUpdate(userStory._id, userStory, { runValidators: true });

    const context1 = await serializer.userStorySerializer(userStory);
    const context2 = await serializer.sprintSerializer(sprint);
    res.json({status: 'OK', message: 'Το Task συνδέθηκε στο Sprint.', userStory: context1, sprint: context2});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/disconnect-task-sprint", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    const task = await Task.findById(req.body.taskID);
    // If no such task found
    if(!task || !project.userStories.includes(task.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    // Check if user is authorized for that action
    const user = req.user;
    if (!task.members.includes(user._id) && !user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }
    
    if (task.sprint) {
      const sprint = await Sprint.findById(task.sprint);
      const userStory = await UserStory.findById(task.userStory);
      sprint.tasks = sprint.tasks.filter((tID) => { return !tID.equals(task._id) })
      let userStoryTask
      let flag = false
      for (let i in userStory.tasks) {
        userStoryTask = await Task.findById(userStory.tasks[i]._id);
        if (userStoryTask.sprint.equals(task.sprint)) {
          flag = true
          break
        }
      }
      if (!flag) {
        userStory.sprints = userStory.sprints.filter((sID) => { return !sID.equals(task.sprint) })
        await UserStory.findByIdAndUpdate(userStory._id, userStory, { runValidators: true });
      }
      task.sprint = null
      await Sprint.findByIdAndUpdate(sprint._id, sprint, { runValidators: true });
      await Task.findByIdAndUpdate(task._id, task, { runValidators: true });
      
      const context1 = await serializer.userStorySerializer(userStory);
      const context2 = await serializer.sprintSerializer(sprint);
      res.json({status: 'OK', message: 'Το Task αποδεσμεύτηκε από το Sprint.', userStory: context1, sprint: context2});
    } else {
      return res.status(400).json({ message: 'Σφάλμα: Το task δεν είναι συνδεδεμένο με κάποιο sprint.' });
    }

  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/connect-task-task", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    const task1 = await Task.findById(req.body.task1ID);
    // If no such task found
    if(!task1 || !project.userStories.includes(task1.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    const task2 = await Task.findById(req.body.task2ID);
    // If no such task found
    if(!task2 || !project.userStories.includes(task2.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    // Check if user is authorized for that action
    const user = req.user;
    if (!project.members.includes(user._id) && !user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }
    if (req.body.conn === 'before') {
      if (task1.afterTasks.includes(task2._id) || task2.beforeTasks.includes(task1._id)) {
        return res.status(400).json({ message: 'Σφάλμα: Η παρούσα σύνδεση μεταξύ tasks είναι αδύνατη.' });
      }
      if (!task1.beforeTasks.includes(task2._id)) {
        task1.beforeTasks.push(task2._id)
        task2.afterTasks.push(task1._id)
      }
    } else if (req.body.conn === 'after') {
      if (task1.beforeTasks.includes(task2._id) || task2.afterTasks.includes(task1._id)) {
        return res.status(400).json({ message: 'Σφάλμα: Η παρούσα σύνδεση μεταξύ tasks είναι αδύνατη.' });
      }
      if (!task1.afterTasks.includes(task2._id)) {
        task1.afterTasks.push(task2._id)
        task2.beforeTasks.push(task1._id)
      }
    } else {
      return res.status(400).json({ message: 'Σφάλμα: Η παρούσα σύνδεση μεταξύ tasks είναι αδύνατη.' });
    }

    await Task.findByIdAndUpdate(task1._id, task1, { runValidators: true });
    await Task.findByIdAndUpdate(task2._id, task2, { runValidators: true });

    const context1 = await serializer.taskSerializer(task1);
    const context2 = await serializer.taskSerializer(task2);
    res.json({status: 'OK', message: 'Τα Tasks συνδέθηκαν μεταξύ τους.', task1: context1, task2: context2});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

router.post("/disconnect-task-task", async (req, res) => {
  try {
    const project = await Project.findById(req.body.projectID);
    // If no such project found
    if(!project) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το project.' });
    }
    const task1 = await Task.findById(req.body.task1ID);
    // If no such task found
    if(!task1 || !project.userStories.includes(task1.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    const task2 = await Task.findById(req.body.task2ID);
    // If no such task found
    if(!task2 || !project.userStories.includes(task2.userStory)) {
      return res.status(400).json({ message: 'Σφάλμα: Δε βρέθηκε το sprint.' });
    }
    // Check if user is authorized for that action
    const user = req.user;
    if (!project.members.includes(user._id) && !user._id.equals(project.productOwner)) {
      return res.status(400).json({ message: 'Σφάλμα: Ο χρήστης δεν έχει δικαίωμα να προβεί σε αυτή την ενέργεια.' });
    }
    if (req.body.conn === 'before') {
      if (task1.beforeTasks.includes(task2._id)) {
        task1.beforeTasks = task1.beforeTasks.filter((tID) => { return !tID.equals(task2._id) });
        task2.afterTasks = task2.afterTasks.filter((tID) => { return !tID.equals(task1._id) });
      }
    } else if (req.body.conn === 'after') {
      if (task1.afterTasks.includes(task2._id)) {
        task1.afterTasks = task1.afterTasks.filter((tID) => { return !tID.equals(task2._id) });
        task2.beforeTasks = task2.beforeTasks.filter((tID) => { return !tID.equals(task1._id) });
      }
    } else {
      return res.status(400).json({ message: 'Σφάλμα: Η παρούσα σύνδεση μεταξύ tasks είναι αδύνατη.' });
    }

    await Task.findByIdAndUpdate(task1._id, task1, { runValidators: true });
    await Task.findByIdAndUpdate(task2._id, task2, { runValidators: true });

    const context1 = await serializer.taskSerializer(task1);
    const context2 = await serializer.taskSerializer(task2);
    res.json({status: 'OK', message: 'Τα Tasks αποδεσμεύτηκαν.', task1: context1, task2: context2});
  } catch (error) {
    res.status(400).json({ message: error });
  }
})

// Export router
module.exports = router;
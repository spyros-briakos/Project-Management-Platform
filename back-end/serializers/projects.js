const serializer = require("./users");
const Project = require("../models/Project");
const Sprint = require("../models/Sprint");
const UserStory = require("../models/UserStory");
const Task = require("../models/Task");

async function projectDescriptionSerializer(query) {
  try {
    // If an id was passed and not a Project object
    if(!(query instanceof Project)){
      query = await Project.findById(query)
    }

    const productOwner = await serializer.usernameSerializer(query.productOwner)
    const scrumMaster = await serializer.usernameSerializer(query.scrumMaster)
    const context = {
      _id: query._id,
      name: query.name,
      description: query.description,
      productOwner: productOwner,
      scrumMaster: scrumMaster,
      // sprints: query.scrumMaster.sprints,
      // tasks: query.scrumMaster.tasks,
      status: query.status,
      plan_in_use: query.plan_in_use,
      startingDate: query.startingDate,
      endingDate: query.endingDate,
      members: []
    }

    for (let i=0; i < query.members.length; i++) {
      context.members[i] = await serializer.usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
    }

    return context
  } catch (error) {
    return { error };
  }
}

async function projectDetailsSerializer(query) {
  try {
    // If an id was passed and not a Project object
    if(!(query instanceof Project)){
      query = await Project.findById(query)
    }

    const productOwner = await serializer.usernameSerializer(query.productOwner)
    const scrumMaster = await serializer.usernameSerializer(query.scrumMaster)
    const context = {
      _id: query._id,
      name: query.name,
      description: query.description,
      productOwner: productOwner,
      scrumMaster: scrumMaster,
      sprints: [],
      userStories: [],
      status: query.status,
      plan_in_use: query.plan_in_use,
      startingDate: query.startingDate,
      endingDate: query.endingDate,
      members: []
    }
    for (let i=0; i < query.members.length; i++) {
      context.members[i] = await serializer.usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
    }
    for (let i=0; i < query.sprints.length; i++) {
      context.sprints[i] = await sprintSerializer(query.sprints[i]); // {id: query.members[i]._id, username: query.members[i].username};
    }
    for (let i=0; i < query.userStories.length; i++) {
      context.userStories[i] = await userStorySerializer(query.userStories[i]); // {id: query.members[i]._id, username: query.members[i].username};
    }

    return context
  } catch (error) {
    return { error };
  }
}

// Sprints
async function sprintSerializer(query) {
  try {
    // If an id was passed and not a Sprint object
    if(!(query instanceof Sprint)){
      query = await Sprint.findById(query)
    }

    const context = {
      _id: query._id,
      name: query.name,
      description: query.description,
      tasks: [],
      status: query.status,
      startingDate: query.startingDate,
      endingDate: query.endingDate,
      estimated_duration: query.estimated_duration,
    }
    for (let i=0; i < query.tasks.length; i++) {
      context.tasks[i] = await taskSerializer(query.tasks[i]);
    }

    return context
  } catch (error) {
    return { error };
  }
}
// UserStories
async function userStorySerializer(query) {
  try {
    // If an id was passed and not a UserStory object
    if(!(query instanceof UserStory)){
      query = await UserStory.findById(query)
    }

    const context = {
      _id: query._id,
      name: query.name,
      description: query.description,
      label: query.label,
      tasks: [],
      sprints: [],
      status: query.status,
      startingDate: query.startingDate,
      endingDate: query.endingDate,
      estimated_duration: query.estimated_duration,
    }
    for (let i=0; i < query.tasks.length; i++) {
      context.tasks[i] = await taskSerializer(query.tasks[i]);
    }
    for (let i=0; i < query.sprints.length; i++) {
      context.sprints[i] = await sprintSerializer(query.sprints[i]);
    }

    return context
  } catch (error) {
    return { error };
  }
}
// Tasks
async function taskSerializer(query) {
  try {
    // If an id was passed and not a Task object
    if(!(query instanceof Task)){
      query = await Task.findById(query)
    }

    const context = {
      _id: query._id,
      name: query.name,
      description: query.description,
      sprint: query.sprint,
      userStory: query.userStory,
      status: query.status,
      startingDate: query.startingDate,
      endingDate: query.endingDate,
      estimated_duration: query.estimated_duration,
      beforeTasks: query.beforeTasks,
      afterTasks: query.afterTasks,
      members: []
    }
    for (let i=0; i < query.members.length; i++) {
      context.members[i] = await serializer.usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
    }

    return context
  } catch (error) {
    return { error };
  }
}

// Export
module.exports.projectDescriptionSerializer = projectDescriptionSerializer;
module.exports.projectDetailsSerializer = projectDetailsSerializer;

module.exports.sprintSerializer = sprintSerializer;
module.exports.userStorySerializer = userStorySerializer;
module.exports.taskSerializer = taskSerializer;

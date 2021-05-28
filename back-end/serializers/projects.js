const { usernameSerializer } = require("../serializers/users");

async function projectDescriptionSerializer(query) {
  try {
    if (typeof query !== 'object') {
      query = await Project.findById(query)
    }
    const context = {
      _id: query._id,
      name: query.name,
      description: query.description,
      productOwner: query.productOwner.username,
      scrumMaster: query.scrumMaster.username,
      // sprints: query.scrumMaster.sprints,
      // tasks: query.scrumMaster.tasks,
      status: query.status,
      plan_in_use: query.plan_in_use,
      startingDate: query.startingDate,
      endingDate: query.endingDate,
      members: []
    }
    for (let i=0; i < query.members.length; i++) {
      context.members[i] = await usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
    }

    return context
  } catch (error) {
    return { error };
  }
}

async function projectDetailsSerializer(query) {
  try {
    if (typeof query !== 'object') {
      query = await Project.findById(query)
    }
    const context = {
      _id: query._id,
      name: query.name,
      description: query.description,
      productOwner: query.productOwner.username,
      scrumMaster: query.scrumMaster.username,
      sprints: query.scrumMaster.sprints,
      userStories: query.scrumMaster.userStories,
      status: query.status,
      plan_in_use: query.plan_in_use,
      startingDate: query.startingDate,
      endingDate: query.endingDate,
      members: []
    }
    for (let i=0; i < query.members.length; i++) {
      context.members[i] = await usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
    }

    return context
  } catch (error) {
    return { error };
  }
}

// Sprints
async function sprintSerializer(query) {
  try {
    if (typeof query !== 'object') {
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
    if (typeof query !== 'object') {
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
    if (typeof query !== 'object') {
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
      members: []
    }
    for (let i=0; i < query.members.length; i++) {
      context.members[i] = await usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
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

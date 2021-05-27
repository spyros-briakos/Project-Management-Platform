const { usernameSerializer } = require("../serializers/users");

async function projectDescriptionSerializer(query) {
  try {
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
      // context.members[i] = usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
      context.members[i] = query.members[i].username;
    }

    return context
  } catch (error) {
    return { error };
  }
}

async function projectDetailsSerializer(query) {
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
    // context.members[i] = usernameSerializer(query.members[i]); // {id: query.members[i]._id, username: query.members[i].username};
    context.members[i] = query.members[i].username;
  }

  return context
}

module.exports.projectDescriptionSerializer = projectDescriptionSerializer;
module.exports.projectDetailsSerializer = projectDetailsSerializer;

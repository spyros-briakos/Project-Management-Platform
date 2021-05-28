const { User, Invitation } = require("../models/User");
const { projectDescriptionSerializer } = require("../serializers/projects");

async function usernameSerializer(query) {
  try {
    if (typeof query !== 'object') {
      query = await User.findById(query)
    }
    const context = {
      id: query._id,
      username: query.username
    }

    return context
  } catch (error) {
    return { error };
  }
}


async function userSerializer(query) {
  try {
    if (typeof query !== 'object') {
      query = await User.findById(query)
    }
    const projects = [];
    for (let i=0; i< query.projects.length; i++) {
      // Get serialized project
      projects.push(await projectDescriptionSerializer(query.projects[i]));

      // // If there was an error
      // if (result.error) {
      //   return { error: error };
      // } else {
      //   projects[i] = result.project;
      // }
    }

    // Will keep from user's invitations only the needed info
    const invitations = []
    for (let i=0; i < query.invitations.length; i++) {
      invitations.push(await invitationSerializer(query.invitations[i]))
    }

    const context = {
      id: query._id,
      username: query.username,
      firstName: query.firstName,
      lastName: query.lastName,
      email: query.email,
      projects: projects,
      invitations: invitations,
      plan_in_use: query.plan_in_use,
      status: query.status,
      image: query.image,
      premium_ending_date: query.premium_ending_date
    }

    return context
  } catch (error) {
    return { error };
  }
}
async function invitationSerializer(query) {
  try {
    if (typeof query !== 'object') {
      query = await Invitation.findById(query)
        .populate('receiver')
        .populate('sender')
        .populate('project');
    }
    context = {
      receiver: query.receiver.username,
      sender: query.sender.username,
      project: query.project.name,
      date: query.date,
      invitationCode: query.invitationCode
    }
    return context
  } catch (error) {
    return { error };
  }
}

module.exports.userSerializer = userSerializer;
module.exports.usernameSerializer = usernameSerializer;

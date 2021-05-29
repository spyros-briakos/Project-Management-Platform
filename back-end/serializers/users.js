const { User, Invitation } = require("../models/User");
const { projectDescriptionSerializer } = require("./projects");

async function usernameSerializer(query) {
  try {
    query = await User.findById(query)
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
    query = await User.findById(query)
    const projects = [];
    for (let i=0; i< query.projects.length; i++) {
      // Get serialized project
      projects.push(await projectDescriptionSerializer(query.projects[i]));
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
    query = await Invitation.findById(query)
      .populate('receiver')
      .populate('sender')
      .populate('project');
    const context = {
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

module.exports.usernameSerializer = usernameSerializer;
module.exports.userSerializer = userSerializer;

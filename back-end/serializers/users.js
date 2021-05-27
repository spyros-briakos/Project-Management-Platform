const { projectDescriptionSerializer } = require("../serializers/projects");

async function usernameSerializer(query) {
  try {
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
    const projects = [];
    for (let i=0; i< user.projects.length; i++) {
      // Get serialized project
      const result = projectDescriptionSerializer(user.projects[i]);

      // If there was an error
      if (result.error) {
        return { error: error };
      } else {
        projects[i] = result.project;
      }
    }

    // Will keep from user's invitations only the needed info
    const invitations = []
    for (let i=0; i < user.invitations.length; i++) {
      invitations[i] = {
        receiver: user.invitations[i].receiver.username,
        sender: user.invitations[i].sender.username,
        project: user.invitations[i].project.name,
        date: user.invitations[i].date,
        invitationCode: user.invitations[i].invitationCode
      }
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

module.exports.userSerializer = userSerializer;
module.exports.usernameSerializer = usernameSerializer;

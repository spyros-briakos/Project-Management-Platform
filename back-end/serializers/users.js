const { projectDescriptionSerializer } = require("../serializers/projects");

function usernameSerializer(query) {
  const context = {
    id: query._id,
    username: query.username
  }

  return context
}


function userSerializer(user) {
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
    id: user._id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    projects: projects,
    invitations: invitations,
    plan_in_use: user.plan_in_use,
    status: user.status,
    image: user.image,
    premium_ending_date: user.premium_ending_date
  }

  return context
}

module.exports.userSerializer = userSerializer;
module.exports.usernameSerializer = usernameSerializer;

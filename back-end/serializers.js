// Import User model
const { User } = require("./models/User");
// Import Project model
const Project = require('./models/Project');

async function serializeProject(id=None, projectObject=None) {
  try {
    let foundProject;

    // Either the project id or a Project object should be passed
    if((id === None && projectObject === None) || (id !== None && projectObject !== None)) {
      return { error: 'Invalid input to serializer' };
    } else if(projectObject === None) {
      foundProject = await Project.findById(id).populate('productOwner')
                                               .populate('scrumMaster')
                                               .populate('sprints')
                                               .populate('members');
    } else {
      foundProject = projectObject;
    }

    // Keep only the needed info
    const project = {
      _id: foundProject._id,
      name: foundProject.name,
      description: foundProject.description,
      productOwner: foundProject.productOwner.username,
      scrumMaster: foundProject.scrumMaster.username,
      // sprints:
      status: foundProject.status,
      plan_in_use: foundProject.plan_in_use,
      startingDate: foundProject.startingDate,
      endingDate: foundProject.endingDate,
      members: []
    }

    // Keep only the username of each member
    for(var i=0; i < foundProject.members.length; i++) {
      project.members[i] = foundProject.members[i].username;
    }

    return { project: project };
  } catch (error) {
    return { error: error };
  }
}

async function serializeUser(id=None, userObject=None) {
  try {
    let user;
  
    // Either the user id or a User object should be passed
    if((id === None && userObject === None) || (id !== None && userObject !== None)) {
      return { error: 'Invalid input to serializer' };
    } else if(userObject === None) {
      // Find user in db
      user = await User.findById(id).populate('invitations')
                                    .populate({ path: 'invitations', populate: { path: 'receiver', model: 'User' } })
                                    .populate({ path: 'invitations', populate: { path: 'sender', model: 'User' } })
                                    .populate({ path: 'invitations', populate: { path: 'project', model: 'Project' } });
    } else {
      user = userObject;
    }

    // Will keep from user's projects only the needed info
    const projects = [];
    for(var i=0; i< user.projects.length; i++) {
      // Get serialized project
      const result = serializeProject(user.projects[i]);

      // If there was an error
      if(result.error) {
        return { error: error };
      }

      projects[i] = result.project;
    }

    // Will keep from user's invitations only the needed info
    const invitations = []
    for(var i=0; i < user.invitations.length; i++) {
      invitations[i] = {
        receiver: user.invitations[i].receiver.username,
        sender: user.invitations[i].sender.username,
        project: user.invitations[i].project.name,
        date: user.invitations[i].date,
        invitationCode: user.invitations[i].invitationCode
      }
    }

    const serialized = {
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

    return { user: serialized };
  } catch (error) {
    return { error: error };
  }
}

module.exports.serializeProject = serializeProject;
module.exports.serializeUser = serializeUser;
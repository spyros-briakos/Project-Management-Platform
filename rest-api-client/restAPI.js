// import { getToken } from '../cli-app/control-center/src/utils';

const https = require('https');
const axios = require('axios');
// require('dotenv').config();

// const apiUrl = `http://${process.env.HOSTNAME}:${process.env.PORT}/api-control`;
const apiUrl = `http://127.0.0.1:3000/api-control`;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// console.log(apiUrl);

// Create empty client object
function initClient() {
  return {
    user: {
      _id: null,
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      status: null,
      image: null,
      projects: [],
      invitations: [],
      plan_in_use: null,
      premium_ending_date: null
    },
    tokenObject: {
      token: null,
      expires: null
    },
    project: null
  }
}

function initProject() {
  return {
    _id: null,
    name: null,
    description: null,
    productOwner: null,
    scrumMaster: null,
    sprints: [],
    userStories: [],
    members: [],
    status: null,
    plan_in_use: null,
    startingDate: null,
    endingDate: null
  }
}

// Initialize client object
export var client = initClient();

export const actions = {
  // Set client object
  setClient(data) {
    if(data.user)
      client.user = data.user;

    if(data.token)
      client.tokenObject = data.token;

    if(data.project)
      client.project = data.project;
  },

  // Get a project's id
  getProjectId(projectName) {
    // If the user has chosen a project
    if(client.project && client.project.name == projectName) {
      return client.project._id;
    }

    // Find project
    let project = client.user.projects.filter(p => p.name == projectName)[0];

    return project._id;
  },

  getUserStoryObj(userStoryName) {
    return client.project.userStories.filter(userStory => userStory.name === userStoryName)[0];
  },

  getSprintObj(sprintName) {
    return client.project.sprints.filter(sprint => sprint.name === sprintName)[0];
  },

  getTaskObj(userStoryName, taskName) {
    for(let userStory of client.project.userStories) {
      if(userStory.name === userStoryName) {
        return userStory.tasks.filter(task => task.name === taskName)[0];
      }
    }
  },


  // USER -----------------------------------------------

  // Login user
  async login(username, password) {
    return requests.loginRequest(username, password)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  // Log out user
  async logout() {
    return requests.logoutRequest(client.tokenObject.token)
    .then(function(response) {
      // Empty client object
      client = initClient();
      return response.message;
    })
    .catch(function(error) { throw error })
  },

  // Sign up user
  async signup(data) {
    return requests.signupRequest(data)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  // Get specific user
  async getUser() {
    return requests.getUserRequest(client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
    })
    .catch(function(error) { throw error })  
  },

  // Update user
  async updateUser(data) {
    return requests.updateUserRequest(data, client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return {
        message: response.message,
        email: response.email
      }
    })
    .catch(function(error) { throw error })    
  },

  // Reset user's password
  async resetPassword(data) {
    return requests.resetPasswordRequest(data, client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  // Send email to the user to create new password
  async forgotPassword(email) {
    return requests.forgotPasswordRequest(email)
    .then(function(response) {
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  // Update user's plan to premium
  async getPremium(plan) {
    return requests.getPremiumRequest(plan, client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  // Delete user
  async deleteUser() {
    return requests.deleteUserRequest(client.tokenObject.token)
    .then(function(response) {
      // Empty client object
      client = initClient();
      return response.message;
    })
    .catch(function(error) { throw error })
  },

  // Get user's invitations to projects
  async getInvitations() {
    return requests.getInvitationsRequest(client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.invitations;
    })
    .catch(function(error) { throw error }) 
  },

  // Sign up with google
  async signupGoogle() {
    return requests.signupGoogleRequest()
    .then(function(response) {
      return response.url;
    })
    .catch(function(error) { throw error })
  },

  // Login with google
  async loginGoogle() {
    return requests.loginGoogleRequest()
    .then(function(response) {
      return response.url;
    })
    .catch(function(error) { throw error })
  },

  // PROJECT -----------------------------------------------

  // Get user's projects
  async getProjects() {
    return requests.getProjectsRequest(client.tokenObject.token)
    .then(function(response) {
      client.user.projects = response.projects;
    })
    .catch(function(error) { throw error })    
  },

  // Invite user(s) to a project
  async inviteUser(projectId, data) {
    return requests.inviteUserRequest(projectId, data, client.tokenObject.token)
    .then(function(response) {
      return response.message;
    })
    .catch(function(error) { throw error })
  },

  // Answer to invitation to a project
  async answerInvitation(answer, invitationCode) {
    return requests.answerInvitationRequest(answer, invitationCode, client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  // Get a specific project
  async getProject(projectName) {
    let projectId = actions.getProjectId(projectName);

    return requests.getProjectRequest(projectId, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
    })
    .catch(function(error) { throw error })    
  },

  async addProject(project) {
    return requests.addProjectRequest(project, client.tokenObject.token)
    .then(function(response) {
      client.user.projects.push(response.project);
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async editProject(project) {
    return requests.editProjectRequest(client.project._id, project, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      const currProject = client.user.projects.filter((p) => { return p._id === client.project._id })[0];
      Object.keys(response.project).forEach(key=>{ if (key in currProject) currProject[key]=response.project[key] });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async getSprints() {
    return requests.getSprintsRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.project.sprints = response.sprints;
    })
    .catch(function(error) { throw error })    
  },

  async getUserStories() {  
    return requests.getUserStoriesRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.project.userStories = response.userStories;
    })
    .catch(function(error) { throw error })    
  },

  async addSprint(sprint) {
    return requests.addSprintRequest(client.project._id, sprint, client.tokenObject.token)
    .then(function(response) {
      client.project.sprints.push(response.sprint);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async addUserStory(userStory) {
    return requests.addUserStoryRequest(client.project._id, userStory, client.tokenObject.token)
    .then(function(response) {
      client.project.userStories.push(response.userStory);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async addTask(task) {
    return requests.addTaskRequest(client.project._id, task, client.tokenObject.token)
    .then(function(response) {
      const currUserStory = client.project.userStories.filter(p => { return p._id === task.userStory })[0];
      if (!currUserStory) throw { message: 'Invalid UserStory id' };
      currUserStory.tasks.push(response.task);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async editSprint(sprint) {
    return requests.editSprintRequest(client.project._id, sprint, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.sprint).forEach(key=>{ sprint[key]=response.sprint[key] });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async editUserStory(userStory) {
    return requests.editUserStoryRequest(client.project._id, userStory, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.userStory).forEach(key=>{ userStory[key]=response.userStory[key] });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async editTask(task) {
    return requests.editTaskRequest(client.project._id, task, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.task).forEach(key=>{ task[key]=response.task[key] });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async joinTask(task) {
    return requests.joinTaskRequest(client.project._id, task._id, client.tokenObject.token)
    .then(function(response) {
      task.members.push(client.user._id);
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async leaveTask(task) {
    return requests.leaveTaskRequest(client.project._id, task._id, client.tokenObject.token)
    .then(function(response) {
      task.members = task.members.filter((mID) => { return mID !== client.user._id });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async connectTasks(task1, task2, conn) {
    const connection = {
      'task1ID': task1._id,
      'task2ID': task2._id,
      'conn': conn,
    }

    return requests.connectTasksRequest(client.project._id, connection, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.task1).forEach(key=>{ task1[key]=response.task1[key] });
      Object.keys(response.task2).forEach(key=>{ task2[key]=response.task2[key] });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async disconnectTasks(task1, task2, conn) {
    const connection = {
      'task1ID': task1._id,
      'task2ID': task2._id,
      'conn': conn,
    }
    return requests.disconnectTasksRequest(client.project._id, connection, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.task1).forEach(key=>{ task1[key]=response.task1[key] });
      Object.keys(response.task2).forEach(key=>{ task2[key]=response.task2[key] });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async connectSprint(task, sprint) {
    const connection = {
      'taskID': task._id,
      'sprintID': sprint._id,
    }
    return requests.connectSprintRequest(client.project._id, connection, client.tokenObject.token)
    .then(function(response) {
      const currUserStory = client.project.userStories.filter((p) => {return p._id === task.userStory})[0];
      if (!currUserStory) throw { message: 'Invalid UserStory id' };
      Object.keys(response.userStory).forEach(key=>{ currUserStory[key]=response.userStory[key] });
      Object.keys(response.sprint).forEach(key=>{ sprint[key]=response.sprint[key] });
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async disconnectSprint(task) {
    const connection = {
      'taskID': task._id
    }
    return requests.disconnectSprintRequest(client.project._id, connection, client.tokenObject.token)
    .then(function(response) {
      try {
        const currSprint = client.project.sprints.filter((p) => {return p._id === task.sprint})[0];
        if (!currSprint) throw { message: 'Invalid Sprint id' };
        const currUserStory = client.project.userStories.filter((p) => {return p._id === task.userStory})[0];
        if (!currUserStory) throw { message: 'Invalid UserStory id' };
        Object.keys(response.userStory).forEach(key=>{ currUserStory[key]=response.userStory[key] });
        Object.keys(response.sprint).forEach(key=>{ currSprint[key]=response.sprint[key] });
        return response.message;
      } catch (error) {
        throw error;
      }
    })
    .catch(function(error) { throw error })    
  },

  async deleteSprint(sprint) {
    return requests.deleteSprintRequest(client.project._id, sprint._id, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async deleteUserStory(userStory) {
    return requests.deleteUserStoryRequest(client.project._id, userStory._id, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async deleteTask(task) {
    return requests.deleteTaskRequest(client.project._id, task._id, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async deleteProject() {
    return requests.deleteProjectRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.user.projects = client.user.projects.filter((p) => {return p._id !== client.project._id});
      client.project = null;
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  async leaveProject() {
    return requests.leaveProjectRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.user.projects = client.user.projects.filter((p) => {return p._id !== client.project._id});
      client.project = null;
      return response.message;
    })
    .catch(function(error) { throw error })    
  },

  getMyTasks() {
    var myTasks = client.project.userStories.filter(userStory =>
       { return userStory.tasks.filter(task =>
         { return task.members.filter(member =>
            { return member._id === client.user._id })
         }) 
       })

    return myTasks;
  }
}

const requests = {

  // USER -----------------------------------------------

  async loginRequest(username, password) {
    let data = {
      username: username,
      password: password
    }

    return requests.send('POST', 'users/login', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async logoutRequest(token) {
    let headers = { "Authorization": `${token}` };
  
    return requests.send('GET', 'secure-routes/logout', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async signupRequest(data) {
    return requests.send('POST', 'users/signup', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async getUserRequest(token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('GET', 'secure-routes/user', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async updateUserRequest(data, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('PATCH', 'secure-routes/edit-user', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async resetPasswordRequest(data, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('PATCH', 'secure-routes/reset-password', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async forgotPasswordRequest(email) {
    let data = { email: email };

    return requests.send('PATCH', 'users/forgot-password', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async getPremiumRequest(plan, token) {
    let data = { plan_in_use: plan };
    let headers = { "Authorization": `${token}` };

    return requests.send('PATCH', 'secure-routes/upgrade-plan', data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },
  
  async deleteUserRequest(token) {
    let headers = { "Authorization": `${token}` };
  
    return requests.send('DELETE', 'secure-routes/delete-user', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async getInvitationsRequest(token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('GET', 'secure-routes/invitations', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async signupGoogleRequest() {
    return requests.send('GET', 'users/signup-google', {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async loginGoogleRequest() {
    return requests.send('GET', 'users/login-google', {})
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  // PROJECT -----------------------------------------------

  async getProjectsRequest(token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `get-projects`, {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async inviteUserRequest(projectId, data, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `secure-routes/project-invite/${projectId}`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async answerInvitationRequest(answer, invitationCode, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('GET', `users/answer-invitation/${invitationCode}?answer=${answer}`, {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async getProjectRequest(projectID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `get-details`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async addProjectRequest(project, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', 'add-project', {project}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async editProjectRequest(projectID, project, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `edit-project`, {projectID, project}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async getSprintsRequest(projectID, token) {
    let headers = { "Authorization": `${token}` };
    let data = { projectID: projectID };

    return requests.send('POST', `get-sprints`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async getUserStoriesRequest(projectID, token) {
    let headers = { "Authorization": `${token}` };
    let data = { projectID: projectID };

    return requests.send('POST', `get-userstories`, data, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async addSprintRequest(projectID, sprint, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `add-sprint`, {projectID, sprint}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async addUserStoryRequest(projectID, userStory, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `add-userstory`, {projectID, userStory}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async addTaskRequest(projectID, task, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `add-task`, {projectID, task}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async editSprintRequest(projectID, sprint, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `edit-sprint`, {projectID, sprint}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async editUserStoryRequest(projectID, userStory, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `edit-userstory`, {projectID, userStory}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async editTaskRequest(projectID, task, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `edit-task`, {projectID, task}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async joinTaskRequest(projectID, taskID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `join-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async leaveTaskRequest(projectID, taskID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `leave-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async connectTasksRequest(projectID, connection, token) {
    let headers = { "Authorization": `${token}` };
    if (!connection.task1ID || !connection.task2ID || !connection.conn) throw 'Invalid connection'

    return requests.send('POST', `connect-task-task`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async disconnectTasksRequest(projectID, connection, token) {
    let headers = { "Authorization": `${token}` };
    if (!connection.task1ID || !connection.task2ID || !connection.conn) throw 'Invalid connection'

    return requests.send('POST', `disconnect-task-task`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async connectSprintRequest(projectID, connection, token) {
    let headers = { "Authorization": `${token}` };
    if (!connection.taskID || !connection.sprintID) throw 'Invalid connection'

    return requests.send('POST', `connect-task-sprint`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async disconnectSprintRequest(projectID, connection, token) {
    let headers = { "Authorization": `${token}` };
    if (!connection.taskID) throw 'Invalid connection'

    return requests.send('POST', `disconnect-task-sprint`, {projectID, ...connection}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async deleteSprintRequest(projectID, sprintID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `delete-sprint`, {projectID, sprintID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async deleteUserStoryRequest(projectID, userStoryID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `delete-userstory`, {projectID, userStoryID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async deleteTaskRequest(projectID, taskID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `delete-task`, {projectID, taskID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async deleteProjectRequest(projectID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `delete-project`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async leaveProjectRequest(projectID, token) {
    let headers = { "Authorization": `${token}` };

    return requests.send('POST', `leave-project`, {projectID}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  // --------------------------------------------------------------

  // Send request
  async send(method, url, data, headers) {
    switch(method) {
      case('POST'):
        return axios.post(`${apiUrl}/${url}`, data, { headers: headers }, { httpsAgent: agent })
        .then(function(response) { return response.data })
        .catch(function(error) { throw error })
      case('GET'):
        return axios.get(`${apiUrl}/${url}`, { headers: headers }, { httpsAgent: agent })
        .then(function(response) { return response.data })
        .catch(function(error) { throw error })
      case('PATCH'):
        return axios.patch(`${apiUrl}/${url}`, data, { headers: headers }, { httpsAgent: agent })
        .then(function(response) { return response.data })
        .catch(function(error) { throw error })
      case('DELETE'):
        return axios.delete(`${apiUrl}/${url}`, { headers: headers }, { httpsAgent: agent })
        .then(function(response) { return response.data })
        .catch(function(error) { throw error })
    }

  }

}
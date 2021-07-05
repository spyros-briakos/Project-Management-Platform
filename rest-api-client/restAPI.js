const https = require('https');
const http = require('http');
const axios = require('axios');
const fs = require('fs');
// require('dotenv').config();

const requests = require('./requests');

// const apiUrl = `http://${process.env.HOSTNAME}:${process.env.PORT}/api-control`;

// const apiUrl = 'https://127.0.0.1:3081/api-control';
const apiUrl = 'http://127.0.0.1:3000/api-control';

// const agent = new https.Agent({
//   requestCert: true,
//   rejectUnauthorized: false,
//   cert: fs.readFileSync('../../back-end/server.cert'),
//   key: fs.readFileSync("../../back-end/server.key"),
//   // passphrase: "YYY"
// });

// const agent = new https.Agent({
const agent = new http.Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

axios.defaults.options = agent
console.log(process.env.NODE_ENV, `RejectUnauthorized is disabled.`)

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

export var client = initClient();

export const actions = {
  // Set client object
  setClient(data) {
    if(data.user)
      // client.user = data.user;
      client.user = JSON.parse(JSON.stringify(data.user));

    if(data.token)
      // client.tokenObject = data.token;
      client.tokenObject = JSON.parse(JSON.stringify(data.token));

    if(data.project)
      // client.project = data.project;
      client.project = JSON.parse(JSON.stringify(data.project));
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
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Log out user
  async logout() {
    return requests.logoutRequest(client.tokenObject.token)
    .then(function(response) {
      // Empty client object
      client = initClient();
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })
  },

    // // Log out user
    // async logout(token) {
    //   return requests.logoutRequest(token)
    //   .then(function(response) {
    //     // Empty client object
    //     client = initClient();
    //     return response.message;
    //   })
    //   .catch(function(error) { client = initClient(); throw error })
    // },

  // Sign up user
  async signup(data) {
    return requests.signupRequest(data)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Get specific user
  async getUser() {
    return requests.getUserRequest(client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
    })
    .catch(function(error) { client = initClient(); console.log(error); throw error })  
  },

  // Get all users
  async getUsers() {
    return requests.getUsersRequest()
    .then(function(response) {
      return response;
    })
    .catch(function(error) { console.log(error); throw error })
  },

  // // Get specific user
  // async getUser(token) {
  //   return requests.getUserRequest(token)
  //   .then(function(response) {
  //     // Set client object
  //     actions.setClient(response);
  //   })
  //   .catch(function(error) { client = initClient(); throw error })  
  // },

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
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Reset user's password
  async resetPassword(data) {
    return requests.resetPasswordRequest(data, client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Send email to the user to create new password
  async forgotPassword(email) {
    return requests.forgotPasswordRequest(email)
    .then(function(response) {
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Update user's plan to premium
  async getPremium(plan) {
    return requests.getPremiumRequest(plan, client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Delete user
  async deleteUser() {
    return requests.deleteUserRequest(client.tokenObject.token)
    .then(function(response) {
      // Empty client object
      client = initClient();
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })
  },

  // Get user's invitations to projects
  async getInvitations() {
    return requests.getInvitationsRequest(client.tokenObject.token)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.invitations;
    })
    .catch(function(error) { client = initClient(); throw error }) 
  },

  // Sign up with google
  async signupGoogle() {
    return requests.signupGoogleRequest()
    .then(function(response) {
      return response.url;
    })
    .catch(function(error) { client = initClient(); throw error })
  },

  // Login with google
  async loginGoogle() {
    return requests.loginGoogleRequest()
    .then(function(response) {
      return response.url;
    })
    .catch(function(error) { client = initClient(); throw error })
  },

  // PROJECT -----------------------------------------------

  // Get user's projects
  async getProjects() {
    return requests.getProjectsRequest(client.tokenObject.token)
    .then(function(response) {
      client.user.projects = response.projects;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Invite user(s) to a project
  async inviteUser(projectId, data) {
    return requests.inviteUserRequest(projectId, data, client.tokenObject.token)
    .then(function(response) {
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })
  },

  // Answer to invitation to a project
  async answerInvitation(answer, invitationCode) {
    return requests.answerInvitationRequest(answer, invitationCode)
    .then(function(response) {
      // Set client object
      actions.setClient(response);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  // Get a specific project
  async getProject(projectName) {
    let projectId = actions.getProjectId(projectName);

    return requests.getProjectRequest(projectId, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

    // Get a specific project
    async getProjectById(projectId) {
  
      return requests.getProjectRequest(projectId, client.tokenObject.token)
      .then(function(response) {
        client.project = response.project;
      })
      .catch(function(error) { client = initClient(); throw error })    
    },

  async addProject(project) {
    return requests.addProjectRequest(project, client.tokenObject.token)
    .then(function(response) {
      client.user.projects.push(response.project);
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async editProject(project) {
    return requests.editProjectRequest(client.project._id, project, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      const currProject = client.user.projects.filter((p) => { return p._id === client.project._id })[0];
      Object.keys(response.project).forEach(key=>{ if (key in currProject) currProject[key]=response.project[key] });
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async getSprints() {
    return requests.getSprintsRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.project.sprints = response.sprints;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async getUserStories() {  
    return requests.getUserStoriesRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.project.userStories = response.userStories;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async addSprint(sprint) {
    return requests.addSprintRequest(client.project._id, sprint, client.tokenObject.token)
    .then(function(response) {
      client.project.sprints.push(response.sprint);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async addUserStory(userStory) {
    return requests.addUserStoryRequest(client.project._id, userStory, client.tokenObject.token)
    .then(function(response) {
      client.project.userStories.push(response.userStory);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async addTask(task) {
    return requests.addTaskRequest(client.project._id, task, client.tokenObject.token)
    .then(function(response) {
      const currUserStory = client.project.userStories.filter(p => { return p._id === task.userStory })[0];
      if (!currUserStory) throw { message: 'Invalid UserStory id' };
      currUserStory.tasks.push(response.task);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async editSprint(sprint) {
    return requests.editSprintRequest(client.project._id, sprint, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.sprint).forEach(key=>{ sprint[key]=response.sprint[key] });
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async editUserStory(userStory) {
    return requests.editUserStoryRequest(client.project._id, userStory, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.userStory).forEach(key=>{ userStory[key]=response.userStory[key] });
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async editTask(task) {
    return requests.editTaskRequest(client.project._id, task, client.tokenObject.token)
    .then(function(response) {
      Object.keys(response.task).forEach(key=>{ task[key]=response.task[key] });
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async joinTask(task) {
    return requests.joinTaskRequest(client.project._id, task._id, client.tokenObject.token)
    .then(function(response) {
      task.members.push(client.user._id);
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async leaveTask(task) {
    return requests.leaveTaskRequest(client.project._id, task._id, client.tokenObject.token)
    .then(function(response) {
      task.members = task.members.filter((mID) => { return mID !== client.user._id });
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
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
    .catch(function(error) { client = initClient(); throw error })    
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
    .catch(function(error) { client = initClient(); throw error })    
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
    .catch(function(error) { client = initClient(); throw error })    
  },

  async disconnectSprint(task) {
    const connection = {
      'taskID': task._id
    }
    return requests.disconnectSprintRequest(client.project._id, connection, client.tokenObject.token)
    .then(function(response) {
      try {
        // const currSprint = client.project.sprints.filter((p) => {return p._id === task.sprint})[0];
        // if (!currSprint) throw { message: 'Invalid Sprint id' };
        // const currUserStory = client.project.userStories.filter((p) => {return p._id === task.userStory})[0];
        // if (!currUserStory) throw { message: 'Invalid UserStory id' };
        // Object.keys(response.userStory).forEach(key=>{ currUserStory[key]=response.userStory[key] });
        // Object.keys(response.sprint).forEach(key=>{ currSprint[key]=response.sprint[key] });
        return response.message;
      } catch (error) {
        client = initClient(); throw error;
      }
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async deleteSprint(sprint) {
    return requests.deleteSprintRequest(client.project._id, sprint._id, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async deleteUserStory(userStory) {
    return requests.deleteUserStoryRequest(client.project._id, userStory._id, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async deleteTask(task) {
    return requests.deleteTaskRequest(client.project._id, task._id, client.tokenObject.token)
    .then(function(response) {
      client.project = response.project;
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async deleteProject() {
    return requests.deleteProjectRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.user.projects = client.user.projects.filter((p) => {return p._id !== client.project._id});
      client.project = null;
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  async leaveProject() {
    return requests.leaveProjectRequest(client.project._id, client.tokenObject.token)
    .then(function(response) {
      client.user.projects = client.user.projects.filter((p) => {return p._id !== client.project._id});
      client.project = null;
      return response.message;
    })
    .catch(function(error) { client = initClient(); throw error })    
  },

  getMyTasks() {
    var myTasks = [];

    // If client is not the product owner of the project
    if(client.user._id === client.project.productOwner._id) {
      for (let us of client.project.userStories) {
        for (let task of us.tasks) {
          if (task.member._id === client.user._id) {
            myTasks.push(task)
          }
        }
      }
    } else {
      // If it is the product owner, return all the tasks in the project
      for (let us of client.project.userStories) {
        myTasks.push(...us.tasks)
      }
    }

    return myTasks;
  }
}

export const send = async (method, url, data, headers) => {
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

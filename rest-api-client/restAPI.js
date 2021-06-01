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
    console.log(error);
    client.project = data.project;
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
      return response.projects;
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

    return requests.send('POST', 'projects/get-projects', {}, headers)
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
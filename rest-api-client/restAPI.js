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
export function initClient() {
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

export function initProject() {
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
      client.project = data.project;
  },

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
}

const requests = {
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

  async deleteUserRequest(token) {
    let headers = { "Authorization": `${token}` };
  
    return requests.send('DELETE', 'secure-routes/delete-user', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },


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
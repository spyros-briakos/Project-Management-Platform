// import { getToken } from '../cli-app/control-center/src/utils';

const https = require('https');
const axios = require('axios');
// require("dotenv/config");                         // Protect sensitive information
require('dotenv').config();

// const apiUrl = `http://${process.env.HOSTNAME}:${process.env.PORT}/api-control`;
const apiUrl = `http://127.0.0.1:3000/api-control`;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// console.log(apiUrl);

export const client = {
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
  project: {
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
  },
  tokenObject: {
    token: null,
    expires: null
  }
}

export const actions = {
  createClient(data) {
    client.user = data.user;
    client.tokenObject = data.token;
  },
  deleteClient() {
    client.user = null;
    client.project = null;
    client.tokenObject = null;
  },
  getToken() {
    return client.tokenObject.token;
  },

  async login(username, password) {
    await requests.loginRequest(username, password)
    .then(function(response) {
      actions.createClient(response.data);
      return response.data.message;
    })
    .catch(function(error) { throw error })    
  },

  async logout() {
    let token = getToken();

    await requests.logoutRequest(token)
    .then(function(response) {
      deleteClient();
      return response.data.message;
    })
    .catch(function(error) { throw error })
  }

}

export const requests = {
  async loginRequest(username, password) {
    let data = {
      username: username,
      password: password
    }

    await requests.send('POST', 'users/login', data)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async logoutRequest(token) {
    let headers = { "Authorization": `Bearer ${token}` }
  
    await this.send('GET', 'secure-routes/logout', {}, headers)
    .then(function(response) { return response })
    .catch(function(error) { throw error })
  },

  async send(method, url, data, headers) {
    switch(method) {
      case('POST'):
        axios.post(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response })
        .catch(function(error) { throw error })
      case('GET'):
        axios.get(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response })
        .catch(function(error) { throw error })
      case('PATCH'):
        axios.get(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response })
        .catch(function(error) { throw error })
      case('DELETE'):
        axios.delete(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response })
        .catch(function(error) { throw error })
    }
  }

}
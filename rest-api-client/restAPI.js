// import { getToken } from '../cli-app/control-center/src/utils';

const https = require('https');
const axios = require('axios');
require('dotenv').config();
// const clientObj = require('./client').clientObj;

// const apiUrl = `http://${process.env.HOSTNAME}:${process.env.PORT}/api-control`;
const apiUrl = `http://127.0.0.1:3000/api-control`;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

// console.log(apiUrl);

// Create empty client object
function clientInit() {
  // console.log('!',typeof client);
  // if(!client) {
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
  // } else {
    // return client;
  // }
}
console.log()
// export const client = clientInit();

export const actions = {
  createClient(data) {
    const client = clientInit();
    client.user = data.user;
    client.tokenObject = data.token;
    global.myClient = client;
  },
  deleteClient() {
    // client.user = null;
    // client.project = null;
    // client.tokenObject = null;
    delete global.myClient;
  },
  getToken() {
    return client.tokenObject.token;
  },

  async login(username, password) {
    return requests.loginRequest(username, password)
    .then(function(response) {
      actions.createClient(response);
      return response.message;
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

    return requests.send('POST', 'users/login', data)
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
    let result;
    switch(method) {
      case('POST'):
        return axios.post(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response.data })
        .catch(function(error) { throw error })
        break;
      case('GET'):
        axios.get(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response })
        .catch(function(error) { throw error })
        break;
      case('PATCH'):
        axios.get(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response })
        .catch(function(error) { throw error })
        break;
      case('DELETE'):
        axios.delete(`${apiUrl}/${url}`, data, headers, { httpsAgent: agent })
        .then(function(response) { return response })
        .catch(function(error) { throw error })
        break;
    }

  }

}
import Vue from 'vue'
import getAPI from './api'

let taskError

export const store = Vue.observable({
  accessToken: localStorage.getItem('user-token') || null,
  userDetails: JSON.parse(localStorage.getItem('user-details')) || null,

  curProject: null
  // Struct should be:
});

export const actions = {
  // User actions
  //! UNDER CONSTRUCTION. WEAR YOUR HELMET TO AVOID ACCIDENTS
  async userSignup (userDetails) {
    await getAPI.post('signup/', userDetails)
    .then(response => {
      // localStorage.setItem('user-token', response.data.key)
      // store.accessToken = token
      // localStorage.setItem('user-details', JSON.stringify(response.data.receptionist))
      // store.userDetails = { ...details }
    })
    .catch(err => {
      throw err;
    })
  },
  async userLogin (userCredentials) {
    await getAPI.post('login/', userCredentials)
    .then(response => {
      localStorage.setItem('user-token', response.data.key)
      store.accessToken = token
      localStorage.setItem('user-details', JSON.stringify(response.data.receptionist))
      store.userDetails = { ...details }
    })
    .catch(err => {
      localStorage.removeItem('user-token') 
      store.accessToken = null
      localStorage.removeItem('user-details') 
      store.userDetails = null
      throw err;
    })
  },
  async userLogout () {
    if (this.isLoggedIn()) {
      await getAPI.post('logout/', {}, { 
        headers: { Authorization: `Token ${store.accessToken}` } 
      })
      .then(() => {
        localStorage.removeItem('user-token') 
        store.accessToken = null
        localStorage.removeItem('user-details') 
        store.userDetails = null
        resolve()
      })
      .catch(err => {
        localStorage.removeItem('user-token') 
        store.accessToken = null
        localStorage.removeItem('user-details') 
        store.userDetails = null
        throw err;
      })
    }
  },
  isLoggedIn () {
    return store.accessToken != null
  },
  getΤoken () {
    if (!store.accessToken) return null
    return store.accessToken
  },
  getName () {
    if (!store.userDetails) return null
    return store.userDetails.name
  },
  getUserID () {
    if (!store.userDetails) return null
    return store.userDetails.id
  },


  // Getters
  async getProjects () {},
  async getTasks () {},
  async getSprints () {},
  async getUserStories () {},
  async getComments () {},

  // Creators
  async createProject () {},
  async createTask () {},
  async createSprint () {},
  async createUserStorie () {},
  async createComment () {},

  // Editors
  async editProject () {},
  async editTask () {},
  async editSprint () {},
  async editUserStorie () {},
  async editComment () {},

  // Complex actions
  // ...
};
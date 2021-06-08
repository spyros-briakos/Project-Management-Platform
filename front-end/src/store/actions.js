import {client, actions} from '@the-ver-best-scrum-team/rest-api-client/restAPI'
var cloneDeep = require('lodash.clonedeep');


const INITIAL_DATA_URL = "https://raw.githubusercontent.com/spympr/estimate-pi/master/temp.json"

import axios from "axios"



var verbose = 1;
var log = function(msg){
	if (1)
		console.log(msg);
}


export default {

	async fetchData({ commit }) {
		commit("SET_LOADING_STATE", true) 
		return axios.get(INITIAL_DATA_URL).then(res => {
		commit("SET_INITIAL_DATA", res.data)
		commit("SET_LOADING_STATE", false)
		})
	},


	async login({ commit }, payload) {
		let username = payload.username 
		let password = payload.password 
		return actions.login(username, password) 
		.then( response => {
			console.log(response);
      		console.log(client);
			commit("STORE_CLIENT", client)
			commit("STORE_TOKEN", client.tokenObject.token)
      return response;
		})
		.catch( error => { 
			log(error);
			throw error;
		})
	},

	async logout({ commit }, payload) {
		// Get client object
		var token = JSON.parse(localStorage.getItem('token'))
		log(token)

		return actions.logout(token) 
		.then( response => {
			log(response);
			commit("DELETE_TOKEN")
			commit("DELETE_CLIENT")
		})
		.catch( error => { 
			log(error);
			throw error;
		})
	},

	async signup({ commit }, payload) {
		return actions.signup(payload) 
		.then( response => {
			log(response)
			log("USER HAS SIGNED IN!");
		})
		.catch( error => { 
			log(error);
			log("ERROR IN SIGNUP");
		}) 
	},

	async forgotPassword({ commit }, payload) {
		return actions.forgotPassword(payload)
		.then( response => {
			log(response)
			log("EMAIL RESETED");
			})
		.catch( error => { 
			log(error);
			log("ERROR IN EMAIL RESET");
			});
	},

	async getUser({ commit, getters }) {

		// Get client object
		var token = JSON.parse(localStorage.getItem('token'))
		console.log(token)
		console.log(client)

		console.log("stateeeeee")
		console.log(getters.client)
		console.log(getters.token)
		console.log(getters.tokenn)
		console.log("teolso stateeeeee")

		console.log("bazo client")
		// client = getters.client
		console.log(client)

		// actions.setClient(getters.client)
		return actions.getUser(token) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_CLIENT", client)
		})
		.catch( error => { 
			console.log(error);
			throw error;
		})

	},

	async saveTaskBoard({ commit }, payload) {
		commit("SAVE_TASKBOARD", payload)
	},
	async archiveTaskBoard({ commit }, payload) {
		commit("ARCHIVE_TASKBOARD", payload)
	},
	async restoreTaskBoard({ commit }, payload) {
		commit("RESTORE_TASKBOARD", payload)
	},
	async setActiveTaskBoard({ commit }, payload) {
		commit("SET_ACTIVE_TASKBOARD", payload)
	},

	async saveTaskList({ commit }, payload) {
		commit("SAVE_TASKLIST", payload)
	},
	async archiveTaskList({ commit }, payload) {
		commit("ARCHIVE_TASKLIST", payload)
	},
	async restoreTaskList({ commit }, payload) {
		commit("RESTORE_TASKLIST", payload)
	},

	async reorderTaskLists({ commit }, payload) {
		commit("REORDER_TASKLISTS", payload)
	},
	async reorderTaskListItems({ commit }, payload) {
		commit("REORDER_TASKLIST_ITEMS", payload)
	},

	async saveTaskListItem({ commit }, payload) {
		commit("SAVE_TASKLIST_ITEM", payload)
	},
	async deleteTaskListItem({ commit }, payload) {
		commit("DELETE_TASKLIST_ITEM", payload)
	}


}

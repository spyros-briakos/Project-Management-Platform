import { answerInvitationRequest, getPremiumRequest } from '@the-ver-best-scrum-team/rest-api-client/requests';
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
		commit("SET_LOADING_STATE", true) 
		return actions.login(username, password) 
		.then( response => {
			console.log(response);
      		console.log(client);
			commit("STORE_CLIENT", client.user)
			commit("STORE_TOKEN", client.tokenObject.token)
			commit("SET_LOGEDIN_STATE", true)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})
	},

	async logout({ commit, getters }, payload) {
		// Get client object
		var token = getters.token
		log(token)
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.logout() 
		.then( response => {
			log(response);
			commit("DELETE_TOKEN")
			commit("DELETE_CLIENT")
			commit("DELETE_PROJECT")
			commit("DELETE_PROJECTS")
			commit("DELETE_INVITES")
			commit("SET_LOGEDIN_STATE", false)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})
	},

	async signup({ commit }, payload) {
		commit("SET_LOADING_STATE", true) 
		return actions.signup(payload) 
		.then( response => {
			log(response)
			log("USER HAS SIGNED IN!");
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			log(error);
			log("ERROR IN SIGNUP");
			commit("SET_LOADING_STATE", false)
			throw error
		}) 
	},

	async forgotPassword({ commit }, payload) {
		commit("SET_LOADING_STATE", true) 
		return actions.forgotPassword(payload)
		.then( response => {
			log(response)
			log("EMAIL RESETED");
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			log(error);
			log("ERROR IN EMAIL RESET");
			commit("SET_LOADING_STATE", false)
			throw error
		});
	},

	async getUser({ commit, getters }) {

		// Get client object
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.getUser() 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_CLIENT", client.user)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async updateUserName({ commit, getters }, data) {

		// Get token
		var token = getters.token
		console.log(data)
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.updateUser(data) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_CLIENT", client.user)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async updateUserEmail({ commit, getters }, data) {

		// Get token
		var token = getters.token
		console.log(data)
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.updateUser(data) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("DELETE_TOKEN")
			commit("DELETE_CLIENT")
			commit("DELETE_PROJECT")
			commit("DELETE_PROJECTS")
			commit("DELETE_INVITES")
			commit("SET_LOGEDIN_STATE", false)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async resetPassword({ commit, getters }, data) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.resetPassword(data) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_CLIENT", client.user)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async deleteUser({ commit, getters }) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.deleteUser() 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("DELETE_TOKEN")
			commit("DELETE_CLIENT")
			commit("DELETE_PROJECT")
			commit("DELETE_PROJECTS")
			commit("DELETE_INVITES")
			commit("SET_LOGEDIN_STATE", false)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async getPremium({ commit, getters }, data) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.getPremium(data) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_CLIENT", client.user)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async addProject({ commit, getters }, data) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.addProject(data) 
		.then( response => {
			console.log(response);
      		console.log(client)
			// commit("STORE_PROJECT", client.project)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async getProject({ commit, getters }, data) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.getProjects() 
		.then( response => {
			console.log(response);
      		console.log(client)
			actions.getProject(data)
			commit("STORE_PROJECT", client.project)
			commit("SET_LOADING_STATE", false)
			// return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async getProjects({ commit, getters }) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.getProjects() 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_PROJECTS", client.user.projects)
			commit("SET_LOADING_STATE", false)
			// return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async getInvites({ commit, getters }) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.getInvitations() 
		.then( response => {
			console.log(response);
      		console.log("ka8aros cliebt", client)
			commit("STORE_INVITES", client.user.invitations)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},


	async inviteUsers({ commit, getters }, usernames) {

		var data = {
			users: usernames,
			project: getters.projectName
		};

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.inviteUser(getters.projectId, data) 
		.then( response => {
			console.log("Invites sent")
			console.log(response);
      		console.log(client)
			// commit("STORE_PROJECTS", client.user.projects)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log("Invites NOOOOT sent")
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async answerInvitation({commit, getters}, data) {

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.answerInvitation(data.answer, data.invitationCode)
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("UPDATE_INVITE", data)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
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

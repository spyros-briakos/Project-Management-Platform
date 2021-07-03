import { answerInvitationRequest, getPremiumRequest } from '@the-ver-best-scrum-team/rest-api-client/requests';
import {client, actions} from '@the-ver-best-scrum-team/rest-api-client/restAPI'
var cloneDeep = require('lodash.clonedeep');

import { emulatedBoard } from './emulatedBoard';

const INITIAL_DATA_URL = "https://raw.githubusercontent.com/spympr/estimate-pi/master/temp.json"

import axios from "axios"



var verbose = 1;
var log = function(msg){
	if (1)
		console.log(msg);
}

var setToken = function(){
	var token = getters.token
	client.tokenObject.token = token
}

var setTokenProject = function(){
	var token = getters.token
	var projectLs = getters.project
	var projectsLs = getters.projects
	client.tokenObject.token = token
	client.project = { _id: projectLs._id }
	client.user.projects = projectsLs
}

export default {

	// async getEmulatedData({ commit, getters }) {
	// 	commit("SET_LOADING_STATE", true) 
	// 	// return axios.get(INITIAL_DATA_URL).then(res => {
	// 	// commit("SET_INITIAL_DATA", res.data)
	// 	// })
	// 	var myEmulatedBoard = cloneDeep(emulatedBoard) 
	// 	var token = getters.token
	// 	var projectLs = getters.project
	// 	var projectsLs = getters.projects
	// 	client.tokenObject.token = token
	// 	client.project = { _id: projectLs._id }
	// 	client.user.projects = projectsLs
		
	// 	console.log("GETT SPRITSSSS", client);
	// 	// add sprints
	// 	return actions.getSprints()
	// 	.then(response => {
	// 		console.log(response);
    //   		console.log(client);
	// 		commit("STORE_SPRINTS", client.project.sprints)
	// 		var sprints = getters.projectSprints
	// 		console.log("EDOOOOOO", sprints)
	// 		// if (sprints) {
	// 		// 	sprints.forEach(sprint => {
	// 		// 		myEmulatedBoard[0].lists.push( {id: new Date().getUTCMilliseconds(),
	// 		// 									name: sprint.name,
	// 		// 									headerColor: "#607d8b",
	// 		// 									archived: false,
	// 		// 									items: [],})
	// 		// 	});
	// 		// }
	// 		// commit("SET_INITIAL_DATA", myEmulatedBoard)
	// 		commit("SET_LOADING_STATE", false)
	// 	})
	// 	.catch( error => { 
	// 		log(error);
	// 		commit("SET_LOADING_STATE", false)
	// 		throw error;
	// 	})
	// },


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
		// log(token)
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token
		return actions.logout() 
		.then( response => {
			log(response);
			commit("DELETE_TOKEN")
			commit("DELETE_CLIENT")
			commit("DELETE_PROJECT")
			commit("DELETE_PROJECTS")
			commit("DELETE_COWORKERS")
			commit("DELETE_SPRINTS")
			commit("DELETE_USER_STORIES")
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
			commit("DELETE_SPRINTS")
			commit("DELETE_USER_STORIES")
			commit("DELETE_COWORKERS")
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
			commit("DELETE_COWORKERS")
			commit("DELETE_SPRINTS")
			commit("DELETE_USER_STORIES")
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

	async createProjectAndInvite({ commit, getters }, data) {
		var inviteUsernameList = data.inviteUsernameList
		var project = data.project
		var totalResposnse = "";

		// Get token
		var token = getters.token
		commit("SET_LOADING_STATE", true) 
		client.tokenObject.token = token

		// Create project
		return actions.addProject(project) 
		.then( response => {
			console.log(response);
      		console.log(client)
			totalResposnse += response
			
			// Get the project
			actions.getProjects() 
			.then( response => {
				actions.getProject(project.name).then( response => {
					console.log(response);
					console.log(client)
					commit("STORE_PROJECT", client.project)
					commit("STORE_SPRINTS", client.project.sprints)
					commit("STORE_USER_STORIES", client.project.userStories)
					commit("STORE_EMULATED_BOARD_DATA", cloneDeep(emulatedBoard) )
					commit("SET_ACTIVE_TASKBOARD", { board: getters.allBoards[0]}) //set active scrum boeard
				
					// Invite to project
					var data = {
						users: inviteUsernameList,
						project: getters.projectName
					};
					// Get token
					var token = getters.token
					var projectLs = getters.project
					var projectsLs = getters.projects
					client.tokenObject.token = token
					client.project = { _id: projectLs._id }
					client.user.projects = projectsLs			
					actions.inviteUser(getters.projectId, data) 
					.then( response => {
						console.log(response);
						console.log(client)
						totalResposnse += response + " "
						commit("SET_LOADING_STATE", false)
					})
					.catch( error => { 
						console.log(error);
						commit("SET_LOADING_STATE", false)
						throw error;
					})
				})
				.catch( error => {
					console.log(error);
					commit("SET_LOADING_STATE", false)
					throw error;
				})
			})
			.catch( error => { 
				console.log(error);
				commit("SET_LOADING_STATE", false)
				throw error;
			})

			commit("SET_LOADING_STATE", false)
			return totalResposnse
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
		client.user._id = getters._id

		return actions.getProjects() 
		.then( response => {
			actions.getProject(data).then( response => {
				console.log(response);
				console.log(client)
				commit("STORE_PROJECT", client.project)
				commit("STORE_SPRINTS", client.project.sprints)
				commit("STORE_USER_STORIES", client.project.userStories)
				commit("STORE_EMULATED_BOARD_DATA", cloneDeep(emulatedBoard))
				commit("STORE_EMULATED_KANBAN_BOARD", actions.getMyTasks())
				commit("SET_ACTIVE_TASKBOARD", { board: getters.allBoards[0]}) //set active scrum boeard
				commit("SET_LOADING_STATE", false)
			})
			.catch( error => {
				console.log(error);
				commit("SET_LOADING_STATE", false)
				throw error;
			})
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	getMyTasks({ commit, getters }) {
		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs

		client.project.userStories = getters.projectUserStories
		client.user._id = getters._id

		commit("SET_LOADING_STATE", true) 
		commit("STORE_EMULATED_KANBAN_BOARD", actions.getMyTasks() )
		console.log("MY TASKS ",actions.getMyTasks())
		commit("SET_LOADING_STATE", false)

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
			commit("STORE_COWORKERS")
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
      		console.log(client)
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
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = { _id: projectLs._id }
		client.user.projects = projectsLs

		commit("SET_LOADING_STATE", true) 
		return actions.inviteUser(getters.projectId, data) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
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

	async editProject({ commit, getters }, projectData) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = { _id: projectLs._id }
		client.user.projects = projectsLs

		commit("SET_LOADING_STATE", true) 
		return actions.editProject(projectData) 
		.then( response => {
			actions.getProjectById(getters.projectId)
			.then( response => {
				console.log(response);
				console.log(client)
				commit("STORE_PROJECT", client.project)
				commit("SET_LOADING_STATE", false)
				return response
			})
			.catch( error => {
				console.log(error);
				console.log(client)
				commit("SET_LOADING_STATE", false)
				throw error;
			})
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async leaveProject({ commit, getters }, projectName) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = { _id: projectLs._id }
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		return actions.leaveProject() 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("DELETE_PROJECT")
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async deleteProject({ commit, getters }, projectName) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = { _id: projectLs._id }
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		return actions.deleteProject() 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("DELETE_PROJECT")
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async addSprint({ commit, getters }, sprintData) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		return actions.addSprint(sprintData) 
		.then( response => {
			console.log(response);
      		console.log(client)
			// commit("STORE_PROJECT", client.project)
			commit("STORE_SPRINT", client.project.sprints[client.project.sprints.length-1])
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async editSprint({ commit, getters }, sprintData) {
		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs

		// // get sprint
		// var sprint = getters.projectSprints.find(s => s._id === sprintData._id)
		// // edit sprint
		// sprint.name = sprintData.name;
		// sprint.description = sprintData.description;
		// sprint.duration = sprintData.estimated_duration;
		// sprint.status = sprintData.status;
		
		commit("SET_LOADING_STATE", true) 
		return actions.editSprint(JSON.parse(JSON.stringify(sprintData))) 
		.then( response => {
			console.log(response);
      		console.log(client)
			// commit("STORE_PROJECT", client.project)
			commit("STORE_SPRINT", sprintData)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async getSprints({ commit, getters }) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		return actions.getSprints() 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_SPRINTS", client.project.sprints)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async deleteSprint({ commit, getters }, sprintId) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		return actions.deleteSprint({_id:sprintId}) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("DELETE_SPRINT", sprintId)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async addUserStory({ commit, getters }, userStoryData) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		return actions.addUserStory(userStoryData) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_USER_STORY", client.project.userStories[client.project.userStories.length-1])
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async editUserStory({ commit, getters }, userStoryData) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs

		// // get user story
		// var userStory = getters.projectUserStories.find(s => s._id === userStoryData._id)
		// // edit user story
		// userStory.name = userStoryData.name;
		// userStory.description = userStoryData.description;
		// userStory.duration = userStoryData.estimated_duration;
		// userStory.status = userStoryData.status;
		// userStory.label = userStoryData.label;
		
		commit("SET_LOADING_STATE", true) 
		return actions.editUserStory(JSON.parse(JSON.stringify(userStoryData))) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_USER_STORY", userStoryData)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async deleteUserStory({ commit, getters }, userStoryId) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		console.log(userStoryId)
		return actions.deleteUserStory({_id:userStoryId}) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("DELETE_USER_STORY", userStoryId)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async getUserStories({ commit, getters }) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs
		
		commit("SET_LOADING_STATE", true) 
		return actions.getUserStories() 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("STORE_USER_STORIES", client.project.userStories)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async addTask({ commit, getters }, taskData) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs

		// add User Story
		client.project.userStories = getters.projectUserStories
		var taskList = client.project.userStories.find(us => us._id === taskData.userStory).tasks

		console.log(taskData)
		commit("SET_LOADING_STATE", true) 
		return actions.addTask(taskData) 
		.then( response => {
			console.log(response);
			console.log(client)
			commit("STORE_TASK", taskList[taskList.length -1])
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async editTask({ commit, getters }, taskData) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs

		// add User Story
		client.project.userStories = getters.projectUserStories

		// // get task
		// var taskList = getters.projectUserStories.find(us => us._id === taskData.userStory).tasks
		// var task = taskList.find(tsk => tsk._id === taskData._id)

		// // edit task
		// task.name = taskData.name
        // task.description = taskData.description
        // task.status = taskData.status
        // task.estimated_duration = taskData.estimated_duration

		commit("SET_LOADING_STATE", true) 
		return actions.editTask(JSON.parse(JSON.stringify(taskData))) 
		.then( response => {
			console.log(response);
			console.log(client)
			commit("STORE_TASK", taskData)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async deleteTask({ commit, getters }, taskId) {

		// Get token
		var token = getters.token
		var projectLs = getters.project
		var projectsLs = getters.projects
		client.tokenObject.token = token
		client.project = projectLs
		client.user.projects = projectsLs

		// add User Story
		client.project.userStories = getters.projectUserStories
		
		commit("SET_LOADING_STATE", true) 
		return actions.deleteTask({_id:taskId}) 
		.then( response => {
			console.log(response);
      		console.log(client)
			commit("DELETE_TASK", taskId)
			commit("SET_LOADING_STATE", false)
			return response
		})
		.catch( error => { 
			console.log(error);
			commit("SET_LOADING_STATE", false)
			throw error;
		})

	},

	async changeTasksState({ commit }, payload) {
		commit("CHANGE_TASKS_STATE", payload)
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
	async restoreTaskList({ commit }, payload) {
		commit("RESTORE_TASKLIST", payload)
	},
	
	// usefull methods
	async saveTaskList({ commit }, payload) {
		// commit("SAVE_TASKLIST", payload)
	},
	async archiveTaskList({ commit }, payload) {
		commit("ARCHIVE_TASKLIST", payload)
	},
	async reorderTaskLists({ commit }, payload) { // maybe usefull for the backlog
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
